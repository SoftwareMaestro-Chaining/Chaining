var express = require('express');
var router = express.Router();
var util = require('../../util');



const controller = require('./workspace.controller');
const controller_auth = require('../user/auth.controller');
const controller_remix = require('./remix.controller');
const controller_jupyter = require('./jupyter.controller');
const controller_ethereum = require('./ethereum.controller');
const controller_component = require('./component.controller')

router.use( function( req, res, next ) {
    // this middleware will call for each requested
    // and we checked for the requested query properties
    // if _method was existed
    // then we know, clients need to call DELETE request instead
    if ( req.query._method == 'DELETE' ) {
        // change the original METHOD
        // into DELETE method
        req.method = 'DELETE';
        // and set requested url to /user/12
        req.url = req.path;
    }       
    next(); 
});

//workspaces index
router.get('/', util.isSignedIn, controller_auth.refreshToken, controller.index);

// workspace create
router.post('/', util.isSignedIn, controller_auth.refreshToken, controller.create);

// workspace new
router.get('/new', util.isSignedIn, controller_auth.refreshToken, controller.new);

// workspace edit
// router.get('/:id', controller.edit);

// workspace show
router.get('/:workspaceId', util.isSignedIn, controller_auth.refreshToken, controller.show);


// workspace get pod
router.get('/:workspaceId/k8s.jsonp', function(req, res, next) {
    controller_component.getListk8s((k8s)=>{
      // res.send('sink({"items":'+JSON.stringify(k8s)+'})');
      res.send(JSON.stringify(k8s));

    });
});

// workspace get node
router.get('/:workspaceId/node.jsonp', function(req, res, next) {
  controller_component.getListNode((k8s)=>{
    res.send('sink({"items":'+JSON.stringify(k8s)+'})');
  });
});


// workspace get all components for topology
router.get('/:workspaceId/all.jsonp', function(req, res, next) {
  controller_component.all((k8s)=>{
    res.send('sink('+JSON.stringify(k8s)+')');
  });
});

// workspace update
// router.put('/:id', controller.put);

// workspace delete
// router.delete('/:id', controller.destroy);

//workspace/jupyter generate
router.post('/generate/jupyters', function(req, res, next) {
  // res.json({})
  console.log("init generation jupyter");
  req.body.app = 'jupyter'
  require('../../generator')(req.body, (data)=>{
    res.json(data);
  })
});

//workspace/jupyter destroy


//workspace/remix generate
router.post('/generate/remixs', function(req, res, next) {
  // res.json({})
  console.log("init generation remix");
  req.body.app = 'remix'
  require('../../generator')(req.body, (data)=>{
    res.json(data);
  })
});

//workspace/jupyter delete
router.delete('/:workspaceId/jupyters/:jupyterName', controller_jupyter.destroy)

//workspace/remix delete
router.delete('/:workspaceId/remixs/:remixName', controller_remix.destroy)

//workspace/jupyter create
// router.post('/:workspaceId/jupyters', util.isSignedIn, controller_auth.refreshToken, controller_jupyter.create)
router.post('/:workspaceId/jupyters', controller_jupyter.create)

//workspace/remix create
// router.post('/:workspaceId/remixs', util.isSignedIn, controller_auth.refreshToken, controller_remix.create)
router.post('/:workspaceId/remixs', controller_remix.create)

module.exports = router;