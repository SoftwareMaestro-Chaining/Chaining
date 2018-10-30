var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('workspaces/index', {title : 'Chaining'})
});

router.get('/new', function(req, res, next) {
  res.render('workspaces/new', {title : 'Chaining'})
});


router.get('/', (req, res) => {..}



router.get('/:id', (req, res) => {..}



router.post('/', (req, res) => {..}



router.delete('/:id', (req,res) => {..}



router.put('/:id', (req,res) => {..}


module.exports = router;