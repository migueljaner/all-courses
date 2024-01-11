import mongoose, { Model, Schema } from 'mongoose';

interface IReviewDoc {
  review: string;
  rating: number;
  createdAt: Date;
  tour: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
}

type ReviewModel = Model<IReviewDoc>;

const reviewSchema = new Schema<IReviewDoc, ReviewModel>(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!'],
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tour: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'tour',
    select: 'name',
  });

  next();
});

const Review = mongoose.model<IReviewDoc, ReviewModel>('Review', reviewSchema);

export default Review;
