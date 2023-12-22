"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthlyPlan = exports.getTourStats = exports.deleteTour = exports.updateTour = exports.createTour = exports.getTour = exports.getAllTours = exports.aliasTopTours = void 0;
const tourModel_1 = __importDefault(require("../models/tourModel"));
const apiFeatures_1 = __importDefault(require("../utils/apiFeatures"));
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};
exports.aliasTopTours = aliasTopTours;
exports.getAllTours = (0, catchAsync_1.default)(async (req, res, next) => {
    // BUILD QUERY
    /* // 1) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    let query = Tour.find(JSON.parse(queryStr)); */
    // 2) Sorting
    /* if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    } */
    //3) Field limiting
    /* if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query.select('-__v');
    } */
    // 4) Pagination
    /* const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist');
    } */
    // EXECUTE QUERY
    const features = new apiFeatures_1.default(tourModel_1.default.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const allTours = await features.query.lean();
    res.status(200).json({
        status: 'succes',
        results: allTours.length,
        data: {
            tours: allTours,
        },
    });
});
exports.getTour = (0, catchAsync_1.default)(async (req, res, next) => {
    const tour = await tourModel_1.default.findById(req.params.id).lean();
    if (!tour) {
        return next(new appError_1.default('No tour found with that ID', 404));
    }
    res.status(200).json({
        status: 'succes',
        data: {
            tour,
        },
    });
});
exports.createTour = (0, catchAsync_1.default)(async (req, res, next) => {
    /* const newTour = new Tour({});
    newTour.save(); */
    const newTour = await tourModel_1.default.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour,
        },
    });
    /* try {
    const newTour = new Tour({});
    newTour.save();

    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  } */
});
exports.updateTour = (0, catchAsync_1.default)(async (req, res, next) => {
    const updatedTour = await tourModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: 'succes',
        data: {
            tour: updatedTour,
        },
    });
});
exports.deleteTour = (0, catchAsync_1.default)(async (req, res, next) => {
    await tourModel_1.default.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: 'succes',
        data: null,
    });
});
exports.getTourStats = (0, catchAsync_1.default)(async (req, res, next) => {
    const stats = await tourModel_1.default.aggregate([
        {
            $match: { ratingsAverage: { $gte: 4.5 } },
        },
        {
            $group: {
                _id: '$difficulty',
                numTours: { $sum: 1 },
                numRatings: { $sum: '$ratingsQuantity' },
                avgRating: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                macPrice: { $max: '$price' },
            },
        },
        {
            $sort: { avgPrice: 1 },
        },
        /* {
          $match: { _id: { $ne: 'easy' } },
        }, */
    ]);
    res.status(200).json({
        status: 'succes',
        data: stats,
    });
});
exports.getMonthlyPlan = (0, catchAsync_1.default)(async (req, res, next) => {
    const year = +req.params.year * 1;
    const plan = await tourModel_1.default.aggregate([
        {
            $unwind: '$startDates',
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                },
            },
        },
        {
            $group: {
                _id: { $month: '$startDates' },
                numTourStarts: { $sum: 1 },
                tours: { $push: '$name' },
            },
        },
        {
            $addFields: { month: '$_id' },
        },
        {
            $addFields: {
                month: {
                    $let: {
                        vars: {
                            monthsInString: [
                                'Jan',
                                'Feb',
                                'Mar',
                                'Apr',
                                'May',
                                'Jun',
                                'Jul',
                                'Aug',
                                'Sep',
                                'Oct',
                                'Nov',
                                'Dec',
                            ],
                        },
                        in: {
                            $arrayElemAt: ['$$monthsInString', '$_id'],
                        },
                    },
                },
            },
        },
        {
            $project: {
                _id: 0,
            },
        },
        {
            $sort: { numTourStarts: -1 },
        },
        {
            $limit: 6,
        },
    ]);
    res.status(200).json({
        status: 'succes',
        data: plan,
    });
});
