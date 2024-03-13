"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.resetPassword = exports.forgotPassword = exports.restrictTo = exports.protect = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const util_1 = require("util");
const crypto_1 = __importDefault(require("crypto"));
const signToken = (id) => jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
});
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id.toString());
    user.password = undefined;
    res
        .status(statusCode)
        .cookie('jwt', token, {
        expires: new Date(Date.now() +
            Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        httpOnly: true,
        //We only activate this in production
        secure: process.env.NODE_ENV === 'production' ? true : false,
    })
        .json({
        status: 'succes',
        data: user,
    });
};
exports.signup = (0, catchAsync_1.default)(async (req, res, next) => {
    const newUser = await userModel_1.default.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt,
        role: req.body.role,
    });
    createSendToken(newUser, 201, res);
});
exports.login = (0, catchAsync_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new appError_1.default('Please provide email and password', 400));
    }
    // 2) Check if the user exists && pass is correct
    const user = await userModel_1.default.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new appError_1.default('Incorrect email or password', 401));
    }
    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
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
exports.forgotPassword = (0, catchAsync_1.default)(async (req, res, next) => {
    // 1) Get user based on POSTed email
    const user = await userModel_1.default.findOne({ email: req.body.email });
    if (!user) {
        return next(new appError_1.default('There is no user with email address', 404));
    }
    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
    try {
        //NOTE: This is just to disable the email sending, it should be just sent to the email, this is for development purposes
        /* await sendEmail({
          email: user.email,
          subject: 'Your password reset token (valid for 10 min)',
          message,
        }); */
        res.status(200).json({
            status: 'succes',
            message: 'Token sent to email!',
            //NOTE: This is not the best way to send the token, it should be just sent to the email, this is for development purposes
            token: resetToken,
        });
    }
    catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new appError_1.default('There was an error sending the email. Try again later!', 500));
    }
});
exports.resetPassword = (0, catchAsync_1.default)(async (req, res, next) => {
    // 1) Get user based on the token
    //NOTE: This is not the best way to send the token, it should be just sent to the email, this is for development purposes
    const hashedToken = crypto_1.default
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');
    const user = await userModel_1.default.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
        return next(new appError_1.default('Token is invalid or has expired', 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    // 3) Update changedPasswordAt property for the user
    // 4) Log the user in, send JWT
    createSendToken(user, 200, res);
});
exports.updatePassword = (0, catchAsync_1.default)(async (req, res, next) => {
    // 1) Get user from collection
    const user = await userModel_1.default.findById(req.user.id).select('+password');
    if (!user) {
        return next(new appError_1.default('There is no user logged in', 404));
    }
    if (!req.body.password || !req.body.passwordConfirm) {
        return next(new appError_1.default('Please provide a new password and passwordConfirm', 400));
    }
    if (!req.body.passwordCurrent) {
        return next(new appError_1.default('Please provide your current password', 400));
    }
    // 2) Check if POSTed current password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new appError_1.default('Your current password is wrong.', 401));
    }
    // 3) If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    //NOTE: User.findByIdAndUpdate will NOT work as intended!
    // 4) Log user in, send JWT
    createSendToken(user, 200, res);
});
