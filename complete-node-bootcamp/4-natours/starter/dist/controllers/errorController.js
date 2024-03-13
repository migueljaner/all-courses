"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const appError_1 = __importDefault(require("../utils/appError"));
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new appError_1.default(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
    var _a;
    const value = (_a = err.errmsg) === null || _a === void 0 ? void 0 : _a.match(/(["'])(\\?.)*?\1/)[0];
    console.log(value);
    const message = `Duplicate field value: ${value}. Please use another value`;
    return new appError_1.default(message, 400);
};
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new appError_1.default(message, 400);
};
const handleJWTError = () => new appError_1.default('Invalid token. Please log in again', 401);
const handleJWTExpiredError = () => new appError_1.default('Your token has expired! Please log in again!', 401);
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
        // Programing or other errors
    }
    else {
        // 1) Log error
        console.log('💥ERROR', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong',
        });
    }
};
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        if (err.name === 'CastError')
            error = handleCastErrorDB(err);
        if (err.code === 11000)
            error = handleDuplicateFieldsDB(err);
        if (err.name === 'ValidationError')
            error = handleValidationErrorDB(err);
        if (err.name === 'JsonWebTokenError')
            error = handleJWTError();
        if (err.name === 'TokenExpiredError')
            error = handleJWTExpiredError();
        sendErrorProd(error, res);
    }
};
