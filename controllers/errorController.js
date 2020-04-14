const AppError = require('../utils/appError');

const castErrorHandler = err => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 404);
};

const handleDuplicateFields = err => {
  const message = `Duplicated field value : / ${err.keyValue.name} / please use another value`;
  return new AppError(message, 400);
};

const validationErrorHandler = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid Input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const jwtErrorHandler = () =>
  new AppError('Invalid Token. Please log in again!', 401);

const expiredTokenHandler = () =>
  new AppError('Your Token has expired. Please log in again', 401);

const sendErrorDev = (err, res) => {
  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    console.error('Error :', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    //? Handling cast errors (invalid ID's)
    if (error.name === 'CastError') error = castErrorHandler(error);
    if (error.code === 11000) error = handleDuplicateFields(error);
    if (error.name === 'ValidationError') error = validationErrorHandler(error);
    if (error.name === 'JsonWebTokenError') error = jwtErrorHandler();
    if (error.name === 'TokenExpiredError') error = expiredTokenHandler();

    sendErrorProd(error, res);
  }
};
