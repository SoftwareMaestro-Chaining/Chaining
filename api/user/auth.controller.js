const mongoose = require('mongoose');


var User = mongoose.model('User');

const jwt = require('jsonwebtoken');

var util     = require('../../util');

exports.new = (req, res) => {
    res.render('users/sign_in', {"title" : "Chaining"});
}

exports.createValidate = (req, res, next) => {
    var isValid = true;
    var validationError = {
      name:'ValidationError',
      errors:{}
    };

    if(!req.body.username){
      isValid = false;
      validationError.errors.username = {message:'Username is required!'};
    }
    if(!req.body.password){
      isValid = false;
      validationError.errors.password = {message:'Password is required!'};
    }

    if(!isValid) return res.render('users/sign_in', {result : util.successFalse(validationError)});
    // if(!isValid) return res.json(util.successFalse(validationError));
    else next();
}

exports.create = (req, res, next) => {
    User.findOne({username:req.body.username})
    .select({password:1, username:1, name:1, email:1})
    .exec(function(err, user){
      if(err) return res.json(util.successFalse(err));
      else if(!user||!user.comparePassword(req.body.password))
        return res.render('users/sign_in', {result : util.successFalse(null, 'Username or Password is invalid'), form: req.body});
         // return res.json(util.successFalse(null, 'Username or Password is invalid'));
      else {
        var payload = {
          _id : user._id,
          username: user.username
        };
        var secretOrPrivateKey = req.app.get('jwt-secret');
        var options = {expiresIn: 60*60*24};
        jwt.sign(payload, secretOrPrivateKey, options, function(err, token){
          if(err) return res.json(util.successFalse(err));
            res.cookie('signedToken', token, { maxAge: 1000*60*5 }).render('workspaces/index', {result : util.successTrue(token)});

            // res.cookie('signedToken', token).render('workspaces/index', {result : util.successTrue(token)});
            console.log(util.successTrue(token));
          // res.json(util.successTrue(token));
        });
      }
    });
}

exports.getCurrentUser = (req, res, next) => {
    User.findById(req.decoded._id)
    .exec(function(err,user){
      if(err||!user) return res.json(util.successFalse(err));
      // res.json(util.successTrue(user));
    });
}

exports.refreshToken = (req, res, next) => {
    console.log("####to refresh Token : "+req.decoded._id)
    User.findById(req.decoded._id)
    .exec(function(err,user){
      if(err||!user) return res.json(util.successFalse(err));
      else {
        var payload = {
          _id : user._id,
          username: user.username
        };
        var secretOrPrivateKey = req.app.get('jwt-secret');
        var options = {expiresIn: 60*60*24};
        jwt.sign(payload, secretOrPrivateKey, options, function(err, token){
          if(err) return res.json(util.successFalse(err));
          console.log("####success refresh Token : "+token)
          res.cookie('signedToken', token, { maxAge: 1000*60*5 })
          next()
          // res.json(util.successTrue(token));
        });
      }
    });
}

exports.destroy = (req, res, next) => {
  
  try {res.clearCookie('signedToken') }
  catch(err) {
    res.json(util.successFalse(err));
  }
  res.render('users/sign_in',
      {
        result : 
          {
            "success": true,
            "message": "Success",
            "errors": null
          }
    });
}
 