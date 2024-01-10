import express, { Request, Response } from 'express';
import morgan from 'morgan';
import globalErrorHandler from './controllers/errorController';
import AppError from './utils/appError';
import tourRouter from './routes/tourRoutes';
import userRouter from './routes/userRoutes';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
//@ts-expect-error
import xss from 'xss-clean';
//@ts-expect-error
import hpp from 'hpp';

const app = express();

// 1) Middlewares

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

//Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'difficulty',
      'maxGroupSize',
      'price',
    ],
  })
);

//Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req: Request, res: Response, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 3) Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
  /* res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`,
  }); */
  /* const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = 'fail';
  err.statusCode = 404; */

  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
// 4) Run te Server
module.exports = app;
