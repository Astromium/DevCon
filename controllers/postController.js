const mongoose = require('mongoose');
const multer = require('multer');
const sharp = require('sharp');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilterImage = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image please upload only images', 400), false);
  }
};

const multerFilterVideo = (req, file, cb) => {
  if (file.mimetype.startsWith('video')) {
    cb(null, true);
  } else {
    cb(new AppError('not a video please upload only videos', 400));
  }
};

const uploadImage = multer({
  storage: multerStorage,
  fileFilter: multerFilterImage,
});
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/videos');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const name = `post-${req.user.id}-${Date.now()}.${ext}`;
    cb(null, name);
  },
});
const uploadVideo = multer({
  storage: diskStorage,
  fileFilter: multerFilterVideo,
});

exports.uploadPostImage = uploadImage.single('image');
exports.uploadPostVideo = uploadVideo.single('video');

exports.resizePostPhoto = (req, res, next) => {
  if (!req.file || !req.file.mimetype.startsWith('image')) return next();
  const ext = req.file.mimetype.split('/')[1];
  let format;
  if (ext === 'svg') {
    format = 'svg';
  } else {
    format = 'jpeg';
  }
  req.file.filename = `post-${req.user.id}-${Date.now()}.${format}`;

  sharp(req.file.buffer)
    .toFormat(`${format}`)
    .jpeg({ quality: 90 })
    .toFile(`public/img/posts/${req.file.filename}`);

  next();
};

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find().sort('-createdAt');

  res.status(200).json({
    status: 'success',
    data: {
      posts,
    },
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  console.log(post.bodyMarkdown);
  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

exports;

exports.getPopularPosts = catchAsync(async (req, res, next) => {
  const popularPosts = await Post.find()
    .sort('-numLikes')
    .limit(10);

  res.status(200).json({
    status: 'success',
    data: {
      posts: popularPosts,
    },
  });
});

exports.createImagePost = catchAsync(async (req, res, next) => {
  let image = '';
  if (req.file) {
    image = req.file.filename;
  }
  const postObject = {
    user: req.user.id,
    postType: req.body.postType,
    tag: req.body.tag,
    markdown: req.body.markdown,
    image,
  };
  const newPost = await Post.create(postObject);
  // add the post to the posts array of the user
  // push the new post to each feed array of each follower (i know its so bad but thats what I come up with :)
  const currentUser = await User.findById(req.user.id).populate('followers');
  // currentUser.followers.forEach(async follower => {
  //   const user = await User.findById(follower._id);
  //   user.feed.unshift(newPost._id);
  //   await user.save({ validateBeforeSave: false });
  // });
  currentUser.posts.unshift(newPost._id);
  await currentUser.save({ validateBeforeSave: false });
  res.status(201).json({
    status: 'success',
    data: {
      post: newPost,
    },
  });
});

exports.createVideoPost = catchAsync(async (req, res, next) => {
  let video = '';
  if (req.file) {
    video = req.file.filename;
  }
  const postObject = {
    user: req.user.id,
    postType: req.body.postType,
    tag: req.body.tag,
    markdown: req.body.markdown,
    video,
  };
  const newPost = await Post.create(postObject);

  const currentUser = await User.findById(req.user.id);

  currentUser.posts.unshift(newPost._id);
  await currentUser.save({ validateBeforeSave: false });
  res.status(201).json({
    status: 'success',
    data: {
      post: newPost,
    },
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (post.user._id.toString() === req.user.id.toString()) {
    post.markdown = req.body.markdown;
    await post.save({ validateBeforeSave: false });
    res.status(200).json({
      status: 'success',
      message: 'Post Updated',
    });
  } else {
    return next(
      new AppError('You dont have the permission to do this action', 401)
    );
  }
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  const currentUser = await User.findById(req.user.id);
  if (post.user._id.toString() === req.user.id.toString()) {
    await Post.findByIdAndDelete(req.params.id);
    const removeIndex = currentUser.posts.indexOf(
      mongoose.Types.ObjectId(req.params.id)
    );
    currentUser.posts.splice(removeIndex, 1);
    await currentUser.save({ validateBeforeSave: false });
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } else {
    return next(
      new AppError('You dont have the permission to preform this action', 401)
    );
  }
});

exports.savePost = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user.id);
  const currentPost = await Post.findById(req.params.id);
  if (currentUser.saved.includes(currentPost.id)) {
    return next(new AppError('You have already saved this post', 401));
  }
  currentUser.saved.unshift(currentPost.id);
  await currentUser.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'Post saved successfully',
    data: {
      user: currentUser,
      post: currentPost,
    },
  });
});

exports.unsavePost = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user.id);
  const currentPost = await Post.findById(req.params.id);
  if (!currentUser.saved.includes(currentPost.id)) {
    return next(new AppError('You did not save this post', 401));
  }
  const removeIndex = currentUser.saved.indexOf(currentPost.id);
  currentUser.saved.splice(removeIndex, 1);
  await currentUser.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'Post unsaved successfully',
  });
});

exports.likePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate('user');
  const currentUser = await User.findById(req.user.id);
  const postAuthor = post.user;
  console.log(postAuthor._id.toString() !== currentUser._id.toString());
  if (post.likes.includes(currentUser.id)) {
    return next(new AppError('You have already liked this post', 401));
  }
  post.likes.unshift(currentUser.id);
  post.numLikes += 1;

  if (postAuthor._id.toString() !== currentUser._id.toString()) {
    const notification = {
      user: currentUser.name,
      message: `${currentUser.name} Liked Your Post`,
      post: post._id,
    };
    // to prevent the duplicate of the notification
    // eg: if i liked a post and then i unliked it
    // and then liked it again
    let arr = [];
    postAuthor.notifications.forEach((notif) => {
      const obj = {
        user: notif.user,
        message: notif.message,
        post: notif.post,
      };
      arr.push(obj);
    });

    if (arr.indexOf(notification) === -1) {
      postAuthor.notifications.unshift(notification);
    }
  }
  await post.save({ validateBeforeSave: false });
  await postAuthor.save({ validateBeforeSave: false });
  res.status(201).json({
    status: 'success',
    message: 'Post liked',
    data: {
      likes: post.likes,
    },
  });
});

exports.unlikePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  const currentUser = await User.findById(req.user.id);
  if (!post.likes.includes(currentUser.id)) {
    return next(new AppError('You did not like this post yet', 401));
  }
  const removeIndex = post.likes.indexOf(currentUser.id);
  post.likes.splice(removeIndex, 1);
  post.numLikes -= 1;
  await post.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'Post unliked',
    data: {
      likes: post.likes,
    },
  });
});

exports.reportPost = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const admins = await User.find({ role: 'admin' });
  let report = req.body;
  const userObj = {
    id: user._id,
    name: user.name,
    photo: user.photo,
  };
  report.user = userObj;
  console.log(report);
  admins.forEach(async (admin) => {
    admin.reports.unshift(report);
    await admin.save({ validateBeforeSave: false });
  });

  res.status(200).json({
    status: 'success',
    message: 'Post Reported to the admins',
  });
});

exports.addComment = catchAsync(async (req, res, next) => {
  const currentPost = await Post.findById(req.params.id).populate('user');
  const user = await User.findById(req.user.id);
  const postAuthor = currentPost.user;
  const commentObj = {
    user: {
      id: req.user.id,
      name: req.user.name,
      photo: req.user.photo,
    },
    post: currentPost._id,
    text: req.body.text,
  };
  if (postAuthor._id.toString() !== user._id.toString()) {
    const notification = {
      user: user.name,
      message: `${user.name} Liked Your Post`,
      post: currentPost._id,
    };
    postAuthor.notifications.unshift(notification);
  }
  currentPost.comments.unshift(commentObj);
  currentPost.numComments += 1;
  await currentPost.save({ validateBeforeSave: false });
  await postAuthor.save({ validateBeforeSave: false });
  res.status(201).json({
    status: 'success',
    message: 'comment added',
    data: {
      comments: currentPost.comments,
      user,
    },
  });
});

exports.updateComment = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  const removeIndex = post.comments.map((doc) => doc.user).indexOf(req.user.id);
  if (removeIndex !== -1) {
    post.comments.splice(removeIndex, 1);
    post.comments.unshift({
      user: req.user.id,
      text: req.body.text,
    });
    await post.save({ validateBeforeSave: false });
  }
  res.status(200).json({
    status: 'success',
    message: 'Comment Updated',
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  const removeIndex = post.comments.map((doc) => doc.user).indexOf(req.user.id);
  if (removeIndex !== -1) {
    post.comments.splice(removeIndex, 1);
    await post.save({ validateBeforeSave: false });
  }
  res.status(200).json({
    status: 'success',
    message: 'Comment Deleted',
  });
});

exports.getPostStats = catchAsync(async (req, res, next) => {
  const stats = await Post.aggregate([
    {
      $group: {
        _id: '$tag',
        numPosts: { $sum: 1 },
      },
    },
    {
      $sort: {
        numPosts: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);
  res.status(200).json({
    status: 'success',
    stats,
  });
});
