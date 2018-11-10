var express = require('express');
var router = express.Router();
const controller = require('./workspace.controller');
var util = require('../../util');

const controller_auth = require('../user/auth.controller');


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
// router.get('/:workspaceId/:remixId', controller.createRemix)

// workspace/remix show
// router.get('/:workspaceId/:remixId', controller.showRemix)

// workspace/jupyter create
// router.get('/:workspaceId/jupyterId', controller.createJupyter)

// workspace/jupyter show
// router.get('/:workspaceId/jupyterId', controller.showJupyter)


module.exports = router;