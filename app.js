var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require("passport")
var FacebookStrategy = require("passport-facebook").Strategy
const fileUpload = require('express-fileupload');
const env = require('../MiniCRM/env');

//Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var companyRouter = require('./routes/companies');
var employeeRouter = require('./routes/employees');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'f81387&*^B#7863n*^G$#(68gn9$w74gbd',
  resave: false,
  saveUninitialized: false,
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
//Da mi budu uvek dostupne poruke od flash
app.use(function (req, res, next) {
  res.locals.flash = req.flash();
  next();
});
app.use(function (req, res, next) {
  if (req.session['user']) {
    res.locals.user = req.session['user'];
  }
  else {
    res.locals.user = null;
  }
  next();
});
app.use(function (req, res, next) {
  if (req.params) {
    next();
  }
  else {
    res.redirect('back');
  }
});

app.use(fileUpload())

//Passport registracija
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
  done(null, user)
})
passport.deserializeUser(function (user, done) {
  done(null, user)
})
passport.use(
  new FacebookStrategy(
    env.passportFacebook,
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile)
    }
  )
)

//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/companies', companyRouter);
app.use('/employees', employeeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
