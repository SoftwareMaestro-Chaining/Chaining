var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var engine = require('ejs-locals');
var bodyParser = require('body-parser'); 

var homeRouter = require('./api/home/index');
var workspaceRouter = require('./api/workspace/index');
var userRouter = require('./api/user/index');

var app = express();

app.engine('ejs', engine);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// getter of req parameter from any page
app.use(function(req, res, next) {

   res.locals.requestObject = {
       query : req.query,
       url   : req.originalUrl,
   }

   next();
});



 // to support JSON bodies
 // to support URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 



app.use('/', homeRouter);
app.use('/users', userRouter);
app.use('/workspaces', workspaceRouter);



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



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
