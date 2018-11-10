var jwt = require('jsonwebtoken');

var util = {};

util.successTrue = function(data){ //1 
  return {
    success:true,
    message:null,
    errors:null,
    data:data
  };
};

util.successFalse = function(err, message){ //2
  if(!err&&!message) message = 'data not found';
  return {
    success:false,
    message:message,
    errors:(err)? util.parseError(err): null,
    data:null
  };
};

util.parseError = function(errors){
  var parsed = {};
  if(errors.name == 'ValidationError'){
    for(var name in errors.errors){
      var validationError = errors.errors[name];
      parsed[name] = { message:validationError.message };
    }
  } else if(errors.code == '11000') {
    if (errors.errmsg.indexOf('username') > 0)
    parsed.username = { message:'This username already exists!' };
    if (errors.errmsg.indexOf('email') > 0)
    parsed.email = { message:'This email already exists!'};
  } else {
    parsed.unhandled = errors;
  }
  return parsed;
};


// middlewares
util.isSignedIn = function(req,res,next){ //4
  // console.log(req.headers['signedToken']);
  console.log(req.cookies.signedToken+"#####");

  // var token = req.headers['x-access-token'];
  var token = req.cookies.signedToken;
  if (!token) return res.json(util.successFalse(null,'token is required!'));
  else {
    jwt.verify(token, req.app.get('jwt-secret'), function(err, decoded) {
      if(err) return res.render('users/sign_in', {result : util.successFalse(err)});
      else{
        req.decoded = decoded;
        next();
      }
    });
  }
};

// private functions
function checkPermission(req,res,next){ //*
  User.findOne({username:req.params.username}, function(err,user){
    if(err||!user) return res.json(util.successFalse(err));
    else if(!req.decoded || user._id != req.decoded._id) 
      return res.json(util.successFalse(null,'You don\'t have permission'));
    else next();
  });
}

module.exports = util;