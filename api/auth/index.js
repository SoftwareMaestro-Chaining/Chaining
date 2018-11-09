var express = require('express');
var router = express.Router();

const controller = require('./auth.controller')

router.get('/', ()=>{res.json({title: "Chaining"});});
// router.post('/register', controller.register)
// router.post('/login', controller.login)

module.exports = router