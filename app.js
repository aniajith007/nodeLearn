var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');      //node js view engine need to set to view

app.use(logger('dev'));    //middleware --- it executes first and then it will redirect others with next().....
app.use(express.json());
app.use(express.urlencoded({ extended: false }));   //it helps to read the body of the request
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));    //public folder setted as static which is user can 
                                                            //this folder...

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});    //middlewares only use next otherewise next neednot.


module.exports = app;
