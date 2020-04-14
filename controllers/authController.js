const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { promisify } = require('util');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/mail');
const User = require('../models/userModel');

const signJwt = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signJwt(user);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 3600 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  // remove the password from the response & active status
  user.password = undefined;
  user.active = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });
  // sign up the user & sending the token in the res
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  // 1) Check if email & password exists
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please Provide an Email and a Password', 400));
    // 401: Bad Request
  }

  // 2) Check if user exists
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Invalid Email or Password', 400));
  }

  // 3) Send token to the client
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'logged out', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get the token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) token = req.cookies.jwt;

  if (!token) {
    return next(new AppError('You are currently not logged in', 401));
  }

  // 2) Decode the token & check if its a valide one
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError('User Does not exist', 401));
  }

  // 3) Check if user didnt change his password after the jwt was issued
  if (currentUser.passwordChanged(decoded.iat)) {
    return next(
      new AppError('User recently changed password, Please log in again', 401)
    );
  }

  // 4) if everything okay
  // Grant access to the protected route
  req.user = currentUser;
  //req = 'hello';
  next();
});

exports.restricTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          'You Dont have the permission to preform this action, access denied',
          403
        )
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get the current user
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('User Does not exist', 401));
  }

  // 2) create reset token
  // and send to the user's email
  const resetToken = user.createResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/forgotPassword/${resetToken}`;
  const subject = 'Your Password Reset Token (expires in 10min)';
  const message = `Forgot Your password ? Submit a reset request to : ${resetUrl}`;
  const mailOptions = {
    email: req.body.email,
    subject,
    message,
  };
  try {
    sendEmail(mailOptions);
    res.status(200).json({
      status: 'success',
      message: 'Reset token sent to your email',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong, Please try again later',
    });
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError('Invalid Token or has expired'));
  }

  // set new password if everything is okay
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  user.changedPasswordAt = Date.now() - 1000;

  // log in the user
  createSendToken(user, 201, res);
});
