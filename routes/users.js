var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  // res.json([{
  //  id: 1,
  //  username: "samsepi0l"
  // }, {
  //  id: 2,
  //  username: "D0loresH4ze"
  // }]);
  res.render('users/sign_in', {title : 'Chaining'})

});

/* GET users listing. */


router.get('/sign_in', function(req, res, next) {
  console.log("found");
  res.render('users/sign_in', {title : 'Chaining'})
});

module.exports = router;