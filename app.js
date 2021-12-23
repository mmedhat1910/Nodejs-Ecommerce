var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
const mongoose = require('mongoose');

var app = express();

const authRoutes = require('./routes/auth');
const insertions = require('./insertions');
const categoryRoutes=require('./routes/category');

const PORT = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.get('/', (req, res) => {
  const loggedin = req.cookies.loggedin
  //todo: convert this into boolean
  if (loggedin=='false') {
    return res.redirect('/login');
  }
  return res.render('home.ejs', { name: 'hello' })
});

app.use('/', authRoutes);

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

const url = process.env.DB_URL
mongoose.connect(url)
  .then(result => {
    console.log('Database running successfully');
    app.listen(PORT, () => {
      console.log(`App running on port ${PORT} 🚀 `)
    })
    //insertions();
  })
  .catch(err => console.log(err))

app.use('/category/:category',categoryRoutes);
// res.send("Text");
// res.json();
// res.redirect('/');
// res.render('');