import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import { CastError, Error } from 'mongoose';

type IError = {
  path?: string;
  value?: string;
  errmsg?: string;
  code?: number;
  name?: string;
  errors?: Error;
  isOperational?: boolean;
  statusCode?: number;
  status?: string;
  message?: string;
  stack?: string;
  stringValue?: string;
  kind?: string;
};

const handleCastErrorDB = (err: IError) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: IError) => {
  const value = err.errmsg?.match(/(["'])(\\?.)*?\1/)![0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: IError) => {
  const errors = Object.values(err.errors!).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again!', 401);

const sendErrorDev = (err: IError, res: Response) => {
  res.status(err.statusCode!).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: IError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode!).json({
      status: err.status,
      message: err.message,
    });

    // Programing or other errors
  } else {
    // 1) Log error
    console.log('💥ERROR', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
};

export = (err: IError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();
    sendErrorProd(error, res);
  }
};
