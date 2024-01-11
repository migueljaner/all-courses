"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.deleteMe = exports.updateMe = exports.getAllUsers = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el))
            newObj[el] = obj[el];
    });
    return newObj;
};
exports.getAllUsers = (0, catchAsync_1.default)(async (req, res) => {
    const users = await userModel_1.default.find();
    res.status(200).json({
        status: 'succes',
        results: users.length,
        data: {
            users: users,
        },
    });
});
exports.updateMe = (0, catchAsync_1.default)(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(new appError_1.default('This route is not for password updates. Please use /updateMyPassword', 400));
    }
    // 2) Update user document
    const filteredBody = filterObj(req.body, 'name', 'email');
    const user = await userModel_1.default.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: 'succes',
        data: {
            user: user,
        },
    });
});
exports.deleteMe = (0, catchAsync_1.default)(async (req, res, next) => {
    await userModel_1.default.findByIdAndUpdate(req.user.id, { active: false });
    res.status(204).json({
        status: 'succes',
        data: null,
    });
});
const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined',
    });
};
exports.getUser = getUser;
const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined',
    });
};
exports.createUser = createUser;
const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined',
    });
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined',
    });
};
exports.deleteUser = deleteUser;
