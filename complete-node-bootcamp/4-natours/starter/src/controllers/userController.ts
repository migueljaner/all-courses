import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import * as factory from './handlerFactory';

const filterObj = (obj: any, ...allowedFields: string[]) => {
  const newObj: any = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

export const getUser = factory.getOne(User);
export const createUser = factory.createOne(User);
export const updateUser = factory.updateOne(User);
export const deleteUser = factory.deleteOne(User);

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(200).json({
    status: 'succes',
    results: users.length,
    data: {
      users: users,
    },
  });
});

export const updateMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for password updates. Please use /updateMyPassword',
          400
        )
      );
    }

    // 2) Update user document
    const filteredBody = filterObj(req.body, 'name', 'email');

    const user = await User.findByIdAndUpdate(req.user!.id, filteredBody, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'succes',
      data: {
        user: user,
      },
    });
  }
);

export const deleteMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await User.findByIdAndUpdate(req.user!.id, { active: false });

    res.status(204).json({
      status: 'succes',
      data: null,
    });
  }
);
