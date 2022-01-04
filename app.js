var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
const mongoose = require('mongoose');
const categoryModel = require('./models/category');
const security_middleware = require('./middleware')


var app = express();

const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/item');
const categoryRoutes = require('./routes/category');
const searchRoutes = require('./routes/search');
const cartRoutes = require('./routes/cart')

const PORT = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(security_middleware);





app.get('/', async (req, res) => {
  const loggedin = req.cookies.loggedin
  //todo: convert this into boolean
  if (loggedin == 'false') {
    return res.redirect('/login');
  }

  const categories = await categoryModel.find();
  // console.log(categories);
  if (categories) {
    res.render('home.ejs', { categories: categories });
  }


  //return res.render('home.ejs', { name: 'hello' })
});






app.use('/', authRoutes);
app.use('/item', itemRoutes);
app.use('/category', categoryRoutes);
app.use('/search', searchRoutes);
app.use('/cart', cartRoutes);



app.get('/*', (req, res) => {
  res.render('error.ejs');
})

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

const url = process.env.DB_URL
mongoose.connect(url)
  .then(result => {
    console.log("================================================")
    console.log('Database running successfully ');
    app.listen(PORT, () => {
      console.log(`App running on port ${PORT} 🚀 `)
      console.log("================================================")
    })

  })
  .catch(err => console.log(err));

