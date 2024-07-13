const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const bookRouter = require('./routes/books');

const app = express();

const mongodb_url = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/testdb";
const db = mongoose.connect(mongodb_url);

db.on("connected", () => {
    console.log("Database connection created...");
});

db.on("error", (err) => {
    console.log("Database error while startup: ", err);
});

if (process.env.NODE_ENV === "development") {
    var corsOptions = {
        origin: "http://localhost:3000",
        optionSuccessStatus: 200,
    };
    app.use(cors.corsOptions);
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/api/book", bookRouter);
app.use('/users', usersRouter);

module.exports = app;
