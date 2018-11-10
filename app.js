var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var engine = require('ejs-locals');
var bodyParser = require('body-parser');
var mongoose    = require('mongoose').set('debut', true);
var morgan = require('morgan');
// var authenticate = require('./authenticate')

var User = require('./api/user/user.model');
var User = require('./api/workspace/workspace.model');


var homeRouter = require('./api/home/index');
var workspaceRouter = require('./api/workspace/index');
var userRouter = require('./api/user/index');

var config = require('./config');

var app = express();

app.engine('ejs', engine);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// enables getter of req parameter from any page
app.use(function(req, res, next) {

   res.locals.requestObject = {
       query : req.query,
       url   : req.originalUrl,
   }

   next();
});



 // to support JSON bodies
 // to support URL-encoded bodies
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); 




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(authenticate.authenticate);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token'); //1
  next();
});

app.use('/', homeRouter);
app.use('/users', userRouter);
app.use('/workspaces', workspaceRouter);



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


// print the request log on console
app.use(morgan('dev'))

// set the secret key variable for jwt
app.set('jwt-secret', config.JWT_SECRET)




// connect to mongoDB server
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // connected to mongoDB server
    console.log("Connected to mongod server");
});

mongoose.connect(config.MONGODB_URI)
  .then(res => console.log("Connected to DB"))
  .catch(err => console.log(err));




module.exports = app;
