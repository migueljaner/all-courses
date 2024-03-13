"use strict";
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    process.exit(1);
});
dotenv.config({ path: './config.env' });
const DB = process.env
    .DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
    .replace('<USER>', process.env.DATABASE_USER);
mongoose.connect(DB).then(() => {
    console.log('DB connection succesful');
});
const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log('App runing on port 3000');
});
process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    server.close(() => {
        process.exit(1);
    });
});
