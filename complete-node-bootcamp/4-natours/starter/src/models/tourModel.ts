import mongoose, { Schema, Document } from 'mongoose';
import slugify from 'slugify';

interface ITourDoc extends Document {
  name: string;
  slug: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  priceDiscount?: number;
  summary: string;
  description?: string;
  imageCover: string;
  images?: string[];
  createdAt: Date;
  startDates?: Date[];
  secretTour?: boolean;
  durationWeeks?: number;
  start: number;
}

const tourSchema = new Schema<ITourDoc>(
  {
    name: {
      type: String,
      required: [true, 'A Tour must hava a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal than 40 characters'],
      minlength: [10, 'A tour name must have mor or equal than 10 characters'],
      /* validate: {
        validator: validator.isAlpha,
        message: 'Tour name ({VALUE}) must only contain characters',
      }, */
    },
    slug: String,
    start: Number,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a max group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (this: ITourDoc, val: number): boolean {
          // this only points to current doc on New document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//VIRTUAL PROPERTIES
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//DOCUMENT MIDDLEWARE: run before .save() and .create()

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
tourSchema.pre('save', (next) => {
  console.log('Will save document...');
  next();
});
tourSchema.post('save', (doc, next) => {
  console.log(doc);
  next();
});

//QUERY MIDDLEWARE
tourSchema.pre('find', function (next) {
  this.find({
    secretTour: { $ne: true },
  });

  this.start = Date.now();

  next();
});

tourSchema.post('find', function (doc, next) {
  if (this.start)
    console.log(`Query took ${Date.now() - this.start!} milliseconds`);

  next();
});

// AGGREGATION MIDDLEWARE

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  next();
});
const Tour = mongoose.model('Tour', tourSchema);

export default Tour;
