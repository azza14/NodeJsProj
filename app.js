var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose= require('mongoose');



var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

app.use(bodyParser.json());

app.use(cors());
app.use(logger('combined'));

app.use(express.static(path.join(__dirname, 'public')));
// connected to db
mongoose.connect('mongodb://localhost/test_mongo',
       {useUnifiedTopology: true },(err)=>{
  if(err)
  {
    console.log(err)
  }
  console.log('connected to DB')
});

const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/orders");
const userRoutes = require('./routes/users');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');  

app.use("/product", productRoutes);
// app.use("/orders", orderRoutes); // orderRoutes is undefined
app.use("/users", userRoutes);
app.use('/', indexRouter);
//app.use('/users', usersRouter);

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
