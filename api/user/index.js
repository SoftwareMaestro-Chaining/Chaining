var express = require('express');
var router = express.Router();

var util = require('../../util');


const controller_auth = require('./auth.controller');
const controller_user = require('./user.controller');


router.get('/sign_up', controller_user.new);

router.post('/', controller_user.create);

router.get('/sign_in', controller_auth.new);

router.post('/sign_in', controller_auth.createValidate, controller_auth.create);

router.get('/user', util.isSignedIn, controller_auth.getCurrentUser);

router.get('/sign_out', util.isSignedIn, controller_auth.destroy)

module.exports = router;