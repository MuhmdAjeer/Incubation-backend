var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {errorHandler} = require('./Middlewares/errorMiddleware')
const cors = require('cors')
const moongose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();


moongose.connect(process.env.DB_URL)
.then(()=> console.log('DB connected'))
.catch((err)=> console.log(err))

var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);


module.exports = app;
