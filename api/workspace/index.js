var express = require('express');
var router = express.Router();
const controller = require('./workspace.controller');
var util = require('../../util');

const controller_auth = require('../user/auth.controller');
const controller_remix = require('./remix.controller');
const controller_jupyter = require('./jupyter.controller');
const controller_ethereum = require('./ethereum.controller');


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

// workspace update
// router.put('/:id', controller.put);

// workspace delete
// router.delete('/:id', controller.destroy);

// workspace/remix create
router.post('/:workspaceId/remixes/', util.isSignedIn, controller_auth.refreshToken, controller_remix.create)

// workspace/remix show
router.get('/:workspaceId/remixes/:remixId', util.isSignedIn, controller_auth.refreshToken, controller_remix.show)

//workspace/jupyter create
// router.post('/:workspaceId/jupyters', util.isSignedIn, controller_auth.refreshToken, controller_jupyter.create)
router.post('/:workspaceId/jupyters', controller_jupyter.create)


//workspace/jupyter show
router.get('/:workspaceId/jupyters/:jupyterId', util.isSignedIn, controller_auth.refreshToken, controller_jupyter.show)

//workspace/jupyter generate
router.post('/generate/jupyters', function(req, res, next) {
  // res.json({})
  console.log("init generation jupyter");
  req.body.app = 'jupyter'
  require('../../generator')(req.body, (data)=>{
    res.json(data);
  })
});


module.exports = router;