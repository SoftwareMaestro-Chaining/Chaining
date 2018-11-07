var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');


const login_controller = require('./user.login.controller');
const registration_controller = require('./user.registration.controller');




router.get('/sign_in', login_controller.new);


router.post('/sign_in', login_controller.create);
// router.get('/sign_in', function(req, res, next) {
//   res.render('users/sign_in', {title : 'Chaining'})
// });

router.get('/sign_up', registration_controller.new);

router.post('/', registration_controller.create);

module.exports = router;