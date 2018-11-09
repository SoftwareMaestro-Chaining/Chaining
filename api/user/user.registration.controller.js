var mongoose = require('mongoose');
var util     = require('../../util');

var User = mongoose.model('User');


exports.show = (req, res) => {

    res.render('users/show', {
    });
}

exports.new = (req, res) => {
    res.render('users/sign_up', {title : 'Chaining'});
}

exports.create = (req, res) => {

    // var { username, email, password, passwordConfirmation } = req.body
    var userParam = req.body;
    userParam.createdAt = Date().toLocaleString();

    // var user = null
    // var user = new User({username: username, email: email, password: password, createdAt: Date().toLocaleString()});

    // create a new user if does not exist
    const create = (user) => {
        if(user) {
            var message = (userParam.username===user[0].username)? "The username exists" : "The email exists";
            throw new Error(message);
        } else {
            return User.create(userParam, function(err, user){
                if(err) return res.json(err);
            });
        }
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.json(util.successFalse(error, error.message))
    }

    User.findOneByUsernameOrEmail(userParam.username, userParam.email).then(create).catch(onError);

    // user.save(function(err){
    //     if(err){
    //         console.error(err);
    //     }
    //     console.error("User is successfully created");

    // });

    // res.redirect('/users/sign_in?toasts=Successfully Registered.');

}


// // create a user a new user
// var testUser = new User({
//     username: "jmar777",
//     email: "chaining@soma.com",
//     createdAt : Date().toString,
//     password: "Password123"
// });

// // save user to database
// testUser.save(function(err) {
//     if (err) throw err;
// });

// // fetch user and test password verification
// User.findOne({ username: 'jmar777' }, function(err, user) {
//     if (err) throw err;

//     // test a matching password
//     user.comparePassword('Password123', function(err, isMatch) {
//         if (err) throw err;
//         console.log('Password123:', isMatch); // -&gt; Password123: true
//     });

//     // test a failing password
//     user.comparePassword('123Password', function(err, isMatch) {
//         if (err) throw err;
//         console.log('123Password:', isMatch); // -&gt; 123Password: false
//     });
// });