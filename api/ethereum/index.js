var express = require('express');
var router = express.Router();
const controller = require('./ethereum.controller');


//ethereums index
router.get('/', controller.index);

// ethereum create
router.post('/', controller.create);

// ethereum new
router.get('/new', controller.new);

// ethereum edit
// router.get('/:id', controller.edit);

// ethereum show
router.get('/:ethereumId', controller.show);

// ethereum update
// router.put('/:id', controller.put);

// ethereum delete
// router.delete('/:id', controller.destroy);



module.exports = router;