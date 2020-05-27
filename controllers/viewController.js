const User = require('../models/userModel');
const Post = require('../models/postModel');
const Report = require('../models/reportModel');
const Job = require('../models/jobModel');
const catchAsync = require('../utils/catchAsync');

exports.getLandingPage = (req, res, next) => {
  res.status(200).render('index', {
    title: 'DevCon',
  });
};

exports.login = (req, res, next) => {
  res.status(200).render('login', {
    title: 'DevCon | Login',
  });
};

exports.signup = (req, res, next) => {
  res.status(200).render('signup', {
    title: 'DevCon | Sign up',
  });
};

exports.startup = (req, res, next) => {
  res.status(200).render('startup', {
    title: 'DevCon For Startups',
  });
};

exports.home = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const feed = req.feed;
  const suggestions = req.suggestions;
  res.status(200).render('home', {
    title: 'DevCon | Home',
    user,
    feed,
    suggestions,
  });
};

exports.welcome = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).render('welcome', {
    title: `Welcome | ${user.name}`,
    user,
  });
};

exports.bookmarks = async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('saved');
  const suggestions = req.suggestions;
  res.status(200).render('bookmarks', {
    title: 'bookmarks',
    user,
    suggestions,
  });
};

exports.me = async (req, res, next) => {
  const user = await User.findById(req.user.id).populate(
    'posts following followers'
  );
  res.status(200).render('me', {
    title: `DevCon | ${user.name}`,
    user,
  });
};

exports.editPost = async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate('user');
  const user = await User.findById(req.user.id);
  res.status(200).render('editPost', {
    title: 'Edit Post',
    post,
    user,
  });
};

exports.settings = async (req, res, next) => {
  const user = await User.findById(req.user.id).populate(
    'posts followers following'
  );

  res.status(200).render('settings', {
    title: 'DevCon | Settings',
    user,
  });
};

exports.userProfile = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ slug: req.params.slug }).populate(
    'posts following followers'
  );
  const loggedUser = await User.findById(req.user.id).populate(
    'following followers'
  );

  res.status(200).render('userProfile', {
    title: `DevCon | ${user.name}`,
    user,
    loggedUser,
  });
});

exports.welcomeStartup = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).render('startups-welcome', {
    title: `Welcome | ${user.name}`,
    user,
  });
});

exports.markdown = (req, res) => {
  res.status(200).render('markdown', {
    title: 'DevCon | Markdown',
  });
};

exports.dashboard = catchAsync(async (req, res, next) => {
  const admin = await User.findById(req.user.id);
  const reports = await Report.find().sort('-issuedAt');
  console.log(reports.length);
  res.status(200).render('dashboard', {
    title: 'Dashboard',
    admin,
    reports,
  });
});

exports.getAllReports = catchAsync(async (req, res, next) => {
  const reports = await Report.find().sort('-issuedAt');
  const admin = await User.findById(req.user.id);
  res.status(200).render('allReports', {
    title: 'All Reports',
    reports,
    admin,
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  res.status(200).render('post', {
    title: `Post from ${post.user.name}`,
    post,
  });
});

exports.allUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({ role: 'user' });
  const admin = await User.findById(req.user.id);
  res.status(200).render('users', {
    title: 'All Users',
    users,
    admin,
  });
});

exports.allStartups = catchAsync(async (req, res, next) => {
  const startups = await User.find({ role: 'startup' });
  const admin = await User.findById(req.user.id);
  res.status(200).render('allStartups', {
    title: 'All Startups',
    users: startups,
    admin,
  });
});

exports.startupProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const jobs = await Job.find({ author: `${req.user.id}` }).sort('-createdAt');

  res.status(200).render('startups-profile', {
    title: `DevCon | ${user.name}`,
    user,
    jobs,
  });
});

exports.startupSettings = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).render('startups-settings', {
    title: `${user.name} | Settings`,
    user,
  });
});

exports.popularPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find().sort('-numLikes -numComments');
  const user = await User.findById(req.user.id);

  res.status(200).render('popularPosts', {
    title: 'DevCon | Popular Posts',
    posts,
    user
  })

})
