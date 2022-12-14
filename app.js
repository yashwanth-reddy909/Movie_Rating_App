require('dotenv').config({path: __dirname + '/.env'})
var createError = require('http-errors');
var express = require('express');
var cors= require('cors');
var path = require('path');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config=require('./config');
var router = require('./routes/index');
var user = require('./routes/users');
var movieRouter= require('./routes/movieRouter');
var favoriteMovieRouter= require('./routes/favoritemovieRouter');
const authenticate=require('./authenticate');
var app = express();
const mongoose=require('mongoose');
const MONGODB_URI =process.env.MONGOURL;
const url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log('Connected to mongo online cluster ');
})
.catch(err=>{
  console.log(err);
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname,'movie-rating-reactapp',"build")));
app.use(router);

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
});

module.exports = app;