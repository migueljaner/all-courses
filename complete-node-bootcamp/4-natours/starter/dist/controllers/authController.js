"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = exports.protect = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const util_1 = require("util");
const signToken = (id) => jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
});
exports.signup = (0, catchAsync_1.default)(async (req, res, next) => {
    const newUser = await userModel_1.default.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt,
        role: req.body.role,
    });
    const token = signToken(newUser._id.toString());
    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser,
        },
    });
});
exports.login = (0, catchAsync_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new appError_1.default('Please provide email and password', 400));
    }
    // 2) Check if the user exists && pass is correct
    const user = await userModel_1.default.findOne({ email }).exec();
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new appError_1.default('Incorrect email or password', 401));
    }
    // 3) If everything ok, send token to client
    const token = signToken(user._id.toString());
    res.status(200).json({
        status: 'succes',
        token,
        data: user,
    });
});
exports.protect = (0, catchAsync_1.default)(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new appError_1.default('You are not logged in! Please log in to get acces', 401));
    }
    // 2) Verification token
    const verifyAsync = (0, util_1.promisify)(jsonwebtoken_1.default.verify);
    const decoded = await verifyAsync(token, process.env.JWT_SECRET);
    // 3) Check if user still exists
    const freshUser = await userModel_1.default.findById(decoded.id);
    if (!freshUser) {
        return next(new appError_1.default('The user belonging to this token does no longer exist.', 401));
    }
    // 4) Check if user changed password after jwt was issued
    if (freshUser.changedPasswordAfter(decoded.iat)) {
        return next(new appError_1.default('User recently changed password! Please log in again.', 401));
    }
    //Grant acces to protected route
    req.user = freshUser;
    next();
});
const restrictTo = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return next(new appError_1.default('You do not have permission to preform this action', 403));
    }
    next();
};
exports.restrictTo = restrictTo;
