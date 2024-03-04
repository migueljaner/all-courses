import { NextFunction, Request, Response } from 'express';
import Tour, { ITourDoc } from '../models/tourModel';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import Booking from '../models/bookingModel';

export const getOverview = catchAsync(async (req: Request, res: Response) => {
  // 1) Get tour data from collection
  const tours = await Tour.find().lean();
  // 2) Build template

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

export const getTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get the data, for the requested tour (including reviews and guides)
    const tour = (await Tour.findOne({ slug: req.params.slug })
      .populate({
        path: 'reviews',
        select: 'review rating user',
      })
      .lean()) as ITourDoc & { isBooked?: boolean };

    const myBookings = await Booking.find({ user: req.user?.id }).populate<{
      tour: ITourDoc;
    }>({
      path: 'tour',
      select: 'name',
    });

    const myTours = myBookings.map((el) => el.tour);

    if (!tour) {
      return next(new AppError('There is no tour with that name.', 404));
    }

    //CHECK IF THE TOUR IS IN THE BOOKINGS
    myTours.forEach((bookedTour) => {
      if (bookedTour.name === tour.name) {
        tour.isBooked = true;
      }
    });

    // 3) Render template using data from 1)
    res.status(200).render('tour', {
      title: `${tour?.name} Tour`,
      tour,
    });
  }
);

export const getLoginForm = (req: Request, res: Response) => {
  res.status(200).render('loginForm', {
    title: 'Log into your account',
  });
};

export const getSignupForm = (req: Request, res: Response) => {
  res.status(200).render('signupForm', {
    title: 'Create an account',
  });
};

export const getMyTours = catchAsync(async (req: Request, res: Response) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });
  const tourIds = bookings.map((el) => el.tour);

  const tours = await Tour.find({ _id: { $in: tourIds } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});

export const getAccount = (req: Request, res: Response) => {
  const user = req.user;

  res.status(200).render('useracc', {
    title: 'Natours | Your account',
    user,
  });
};

export const getMyBookings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookings = await Booking.find({ user: req.user.id }).populate({
      path: 'tour',
    });

    const tours = bookings.map((el) => el.tour);

    res.status(200).render('overview', {
      title: 'My Bookings',
      tours,
    });
  }
);