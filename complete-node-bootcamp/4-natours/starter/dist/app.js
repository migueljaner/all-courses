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
const app = (0, express_1.default)();
// 1) Middlewares
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.use(express_1.default.json());
app.use(express_1.default.static(`${__dirname}/public`));
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});
// 3) Routes
app.use('/api/v1/tours', tourRoutes_1.default);
app.use('/api/v1/users', userRoutes_1.default);
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
