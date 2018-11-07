const mongoose = require('mongoose');

var User = mongoose.model('User');


exports.show = (req, res) => {

    res.render('users/show', {
        workspace: {
            id: 'testWorkspaceId01',
            name: 'testWorkspaceName01',
            description : 'testWorkspaceName01 is the best workspace ever! \n Because testWorkspace is in the best blockchain network which is provided by Chaining.',
            type: 'Ethereum',
            createdAt: new Date().toDateString()
        }
    });
}

exports.new = (req, res) => {
    res.render('users/sign_up', {title : 'Chaining'});
}

exports.create = (req, res) => {

    var user = new User({username: req.body.username, email: req.body.email, password: req.body.password, createdAt: Date().toLocaleString()});

    user.save(function(err){
        if(err){
            console.error(err);
        }
        console.error("User is successfully created");

    });

    res.redirect('/users/sign_in?toasts=Successfully Registered.');

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