"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const appError_1 = __importDefault(require("./utils/appError"));
const tourRoutes_1 = __importDefault(require("./routes/tourRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
//@ts-expect-error
const xss_clean_1 = __importDefault(require("xss-clean"));
//@ts-expect-error
const hpp_1 = __importDefault(require("hpp"));
const app = (0, express_1.default)();
// 1) Middlewares
// Set security HTTP headers
app.use((0, helmet_1.default)());
// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
// Limit requests from same API
const limiter = (0, express_rate_limit_1.default)({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in an hour!',
});
app.use('/api', limiter);
// Body parser, reading data from body into req.body
app.use(express_1.default.json({ limit: '10kb' }));
// Data sanitization against NoSQL query injection
app.use((0, express_mongo_sanitize_1.default)());
// Data sanitization against XSS
app.use((0, xss_clean_1.default)());
//Prevent parameter pollution
app.use((0, hpp_1.default)({
    whitelist: [
        'duration',
        'ratingsAverage',
        'ratingsQuantity',
        'difficulty',
        'maxGroupSize',
        'price',
    ],
}));
//Serving static files
app.use(express_1.default.static(`${__dirname}/public`));
// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.headers);
    next();
});
// 3) Routes
app.use('/api/v1/tours', tourRoutes_1.default);
app.use('/api/v1/users', userRoutes_1.default);
app.use('/api/v1/reviews', reviewRoutes_1.default);
app.all('*', (req, res, next) => {
    /* res.status(404).json({
      status: 'fail',
      message: `Can't find ${req.originalUrl} on this server`,
    }); */
    /* const err = new Error(`Can't find ${req.originalUrl} on this server`);
    err.status = 'fail';
    err.statusCode = 404; */
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(errorController_1.default);
// 4) Run te Server
module.exports = app;
