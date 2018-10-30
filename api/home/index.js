var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.redirect('/users/sign_in');
});

router.get('/main', function(req, res, next) {
  res.render('home/index', {title : 'Chaining'})
});

router.get('/help', function(req, res, next) {
  res.render('home/help', {title : 'Chaining'})
});

router.get('/graph', function(req, res, next) {
  res.render('topology-graph', {title : 'Chaining'})
});

router.get('/terminal', function(req, res, next) {
  res.render('container-terminal', {title : 'Chaining'})
});

// var controller = require('../controller');
// router.get('/k8s.jsonp', function(req, res, next) {
//     controller.getListk8s((k8s)=>{
//       res.send('sink({"items":'+JSON.stringify(k8s)+'})');
//     });
// });

// router.get('/node.jsonp', function(req, res, next) {
//   controller.getListNode((k8s)=>{
//     res.send('sink({"items":'+JSON.stringify(k8s)+'})');
//   });
// });

// router.get('/all.jsonp', function(req, res, next) {
//   controller.all((k8s)=>{
//     res.send('sink('+JSON.stringify(k8s)+')');
//   });
// });
router.post('/generate/jupyter', function(req, res, next) {
  // res.json({});
  req.body.app = 'jupyter'
  require('../../generator')(req.body, (data)=>{
    res.json(data);
  })
});

router.post('/generate/remix', function(req, res, next) {
  // res.json({});
  req.body.app = 'remix'
  require('../../generator')(req.body, (data)=>{
    res.json(data);
  })
});
module.exports = router;
