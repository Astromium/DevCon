const User = require('../models/userModel');
const Post = require('../models/postModel');
const Report = require('../models/reportModel');
const Job = require('../models/jobModel');
const Room = require('../models/roomModel');
const Message = require('../models/messageModel');
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
  console.log(user.notifNum, user.notifications.length);
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

  let jobs;
  if (user.role === 'startup') {
    jobs = await Job.find({ author: `${user._id}`, status: 'open' }).sort(
      '-createdAt'
    );
  }

  res.status(200).render('userProfile', {
    title: `DevCon | ${user.name}`,
    user,
    jobs,
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
    user,
  });
});

exports.jobOffers = catchAsync(async (req, res, next) => {
  const jobs = await Job.find().sort('-createdAt');
  const user = await User.findById(req.user.id);

  res.status(200).render('jobOffers', {
    title: 'DevCon | Job Offers',
    jobs,
    user,
  });
});

exports.room = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const room = await Room.findById(req.params.id)
    .populate('users')
    .select('name photo');
  const messages = await Message.find({ roomId: room._id })
    .populate('sender', 'name photo')
    .populate('reciever', 'name photo')
    .sort('createdAt');
  // find all the rooms in which the users array
  // contains the user id
  const rooms = await Room.find({ users: user._id }).populate(
    'users',
    'name photo'
  );

  // remove the current user from the users array of each room
  rooms.map((rm) => {
    let i;
    rm.users.map((usr, index) => {
      if (usr.name === user.name) i = index;
    });
    rm.users.splice(i, 1);
  });
  rooms.forEach((rm) =>
    rm.users.forEach((usr) =>
      console.log('\n' + '------ ' + usr.name + ' -----' + '\n' + usr)
    )
  );
  let otherUser = room.users.find(
    (usr) => usr._id.toString() != user._id.toString()
  );

  res.render('room', {
    title: 'chat',
    messages,
    roomId: room._id,
    user,
    otherUser,
    rooms,
  });
});

exports.messages = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  // find all the rooms in which the users array
  // contains the user id
  const rooms = await Room.find({ users: user._id }).populate(
    'users',
    'name photo occupation'
  );

  // remove the current user from the users array of each room
  rooms.map((rm) => {
    let i;
    rm.users.map((usr, index) => {
      if (usr.name === user.name) i = index;
    });
    rm.users.splice(i, 1);
  });
  rooms.forEach((rm) =>
    rm.users.forEach((usr) =>
      console.log('\n' + '------ ' + usr.name + ' -----' + '\n' + usr)
    )
  );
  console.log(rooms);

  // get all the recent messages
  const messages = await Message.find({
    $or: [{ sender: req.user.id }, { reciever: req.user.id }],
  })
    .sort('-createdAt')
    .populate('sender reciever', 'name photo');

  // so what im trying to do here is when I get all the messages
  // I want to group them by the roomId
  // and only get the last message in each room

  let arr = [];
  let arr2 = [];
  messages.map((msg) => {
    if (!arr.includes(msg.roomId.toString())) {
      arr.push(msg.roomId.toString());
      arr2.push(msg);
    }
  });

  console.log(arr, arr2);

  res.status(200).render('messages', {
    title: 'DevCon | messages',
    user,
    conversations: arr2,
    rooms,
  });
});

exports.jobSearchResults = catchAsync(async (req, res, next) => {
  const query = req.params.query
  const jobs = await Job.find({ $or: [{ 'title': { '$regex': query, '$options': 'i' } }, { 'description': { '$regex': query, '$options': 'i' } }] }).sort('-createdAt')
  const user = await User.findById(req.user.id);
  res.status(200).render('job-results', {
    title: query,
    jobs,
    user,
    length: jobs.length,
    query
  })
})
