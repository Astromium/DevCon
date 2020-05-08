const User = require('../models/userModel');
const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');

exports.getLandingPage = (req, res, next) => {
  res.status(200).render('landing', {
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

exports.dashboard = catchAsync(async (req, res) => {
  const stats = await User.aggregate([
    {
      $group: {
        _id: 'role',
        num: { $sum: 1 },
      },
    },
  ]);
  const filteredStats = stats.filter((doc) => doc._id !== 'admin');
  console.log(filteredStats);
  res.status(200).render('dashboard', {
    title: 'Dashboard',
  });
});
