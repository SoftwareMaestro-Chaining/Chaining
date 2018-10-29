var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('workspaces/index', {title : 'Chaining'})
});


module.exports = router;