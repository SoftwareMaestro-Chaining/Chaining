const mongoose = require('mongoose');


var User = mongoose.model('User');

const jwt = require('jsonwebtoken');

var util     = require('../../util');

exports.index = (req, res) => {

    res.render('users/index', {
        //db.current_user.users
        users: [
            {
            id: 'testWorkspaceId01',
            name: 'testWorkspaceName01',
            description : 'testWorkspaceName01 is the best workspace ever! \n Because testWorkspace is in the best blockchain network which is provided by Chaining.',
            scope: 'public',
            type: 'Ethereum',
            createdAt: new Date().toDateString(),
            userName: 'testUserName01'
            },
            {
            id: 'testWorkspaceId02',
            name: 'testWorkspaceName02',
            description : 'testWorkspaceName02 is the best workspace ever! \n Because testWorkspace is in the best blockchain network which is provided by Chaining.',
            scope: 'public',
            type: 'Hyperledger',
            createdAt: new Date().toDateString(),
            userName: 'testUserName01'
            },
            {
            id: 'testWorkspaceId03',
            name: 'testWorkspaceName03',
            description : 'testWorkspaceName01 is the best workspace ever! \n Because testWorkspace is in the best blockchain network which is provided by Chaining.',
            scope: 'private',
            type: 'Ethereum',
            createdAt: new Date().toDateString(),
            userName: 'testUserName01'
            }
        ]
    });
}

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
    res.render('users/sign_in', {"title" : "Chaining"});
}

exports.create = (req, res) => {

    var username = req.body.username;
    var password = req.body.password

    // fetch user and test password verification
    User.findOne({ username: username }, function(err, user) {
        if (err) throw err;

        // test a matching password
        user.comparePassword(password, function(err, isMatch) {
            if (err) throw err;
            if (isMatch){
                // var payload = {
                //   _id : user._id,
                //   username: user.username
                // };
                // var secretOrPrivateKey = process.env.JWT_SECRET;
                // var options = {expiresIn: 60*60*24};
                // jwt.sign(payload, secretOrPrivateKey, options, function(err, token){
                //   if(err) return res.json(util.successFalse(err));
                //   res.json(util.successTrue(token));
                // });                
                res.redirect('/workspaces?toasts=Successfully Signed-in.');
            }
            else
                res.redirect('/user/sign_in?toasts=Wrong Username or Password.\n Try Again.');
            // console.log('Password123:', isMatch); // -&gt; Password123: true
        });
    });
   
    // // res.render('create', {title : 'Chaining'});

    // const {username, password} = req.body
    // const secret = req.app.get('jwt-secret')

    // // check the user info & generate the jwt
    //     // check the user info & generate the jwt
    // const check = (user) => {
    //     if(!user) {
    //         // user does not exist
    //         throw new Error('login failed')
    //     } else {
    //         // user exists, check the password
    //         if(user.verify(password)) {
    //             // create a promise that generates jwt asynchronously
    //             const p = new Promise((resolve, reject) => {
    //                 jwt.sign(
    //                     {
    //                         _id: user._id,
    //                         username: user.username,
    //                         admin: user.admin
    //                     }, 
    //                     secret, 
    //                     {
    //                         expiresIn: '7d',
    //                         issuer: 'velopert.com',
    //                         subject: 'userInfo'
    //                     }, (err, token) => {
    //                         if (err) reject(err)
    //                         resolve(token) 
    //                     })
    //             })
    //             return p
    //         } else {
    //             throw new Error('login failed')
    //         }
    //     }
    // }

    // // respond the token 
    // const respond = (token) => {
    //     res.json({
    //         message: 'logged in successfully',
    //         token
    //     })
    // }

    // // error occured
    // const onError = (error) => {
    //     res.status(403).json({
    //         message: error.message
    //     })
    // }

    // // find the user
    // User.findOneByUsername(username)
    // .then(check)
    // .then(respond)
    // .catch(onError)




    // res.redirect('/');
}


// }