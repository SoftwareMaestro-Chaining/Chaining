var express = require('express');
var router = express.Router();
var util = require('../../util');



router.get('/', function(req, res, next) {
  res.redirect('/workspaces');
});

router.get('/main', function(req, res, next) {
  res.render('home/index', {title : 'Chaining'})
});

router.get('/help', function(req, res, next) {
  res.render('home/help', {title : 'Chaining'})
});

module.exports = router;
