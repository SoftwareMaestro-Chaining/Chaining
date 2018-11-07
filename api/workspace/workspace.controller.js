const mongoose = require('mongoose');

var Workspace = mongoose.model('Workspace');

exports.index = (req, res, callback) => {

    var workspaces = [];

    var setWorkspaces = function(param) {
        workspaces = param;
    }
    // res.callbackWaitsForEmptyEventLoop = false;
    Workspace.find().sort({ _id: -1 }).limit(20).lean().exec().then(function(result){
        res.render('workspaces/index', {workspaces: result})
    });

    // console.log(workspaces);
    // res.render('workspaces/index', {

        // workspaces : workspaces

        //db.current_user.workspaces
        // workspaces: [
        //     {
        //     id: 'testWorkspaceId01',
        //     name: 'testWorkspaceName01',
        //     description : 'testWorkspaceName01 is the best workspace ever! \n Because testWorkspace is in the best blockchain network which is provided by Chaining.',
        //     scope: 'public',
        //     type: 'Ethereum',
        //     createdAt: new Date().toDateString(),
        //     userName: 'testUserName01'
        //     },
        //     {
        //     id: 'testWorkspaceId02',
        //     name: 'testWorkspaceName02',
        //     description : 'testWorkspaceName02 is the best workspace ever! \n Because testWorkspace is in the best blockchain network which is provided by Chaining.',
        //     scope: 'public',
        //     type: 'Hyperledger',
        //     createdAt: new Date().toDateString(),
        //     userName: 'testUserName01'
        //     },
        //     {
        //     id: 'testWorkspaceId03',
        //     name: 'testWorkspaceName03',
        //     description : 'testWorkspaceName01 is the best workspace ever! \n Because testWorkspace is in the best blockchain network which is provided by Chaining.',
        //     scope: 'private',
        //     type: 'Ethereum',
        //     createdAt: new Date().toDateString(),
        //     userName: 'testUserName01'
        //     }
        // ]
    // });
}

exports.show = (req, res) => {

    res.render('workspaces/show', {
        workspace: {
            id: 'testWorkspaceId01',
            name: 'testWorkspaceName01',
            description : 'testWorkspaceName01 is the best workspace ever! \n Because testWorkspace is in the best blockchain network which is provided by Chaining.',
            type: 'Ethereum',
            createdAt: new Date().toDateString()
        }
    });
}

exports.new = (req, res) => {
    res.render('workspaces/new', {title : 'Chaining'});
}

exports.create = (req, res) => {

    var workspace = new Workspace({name: req.body.name, description: req.body.description, scope: req.body.scope, type: req.body.type, createdAt: Date().toLocaleString()});

    console.log(workspace);

    workspace.save(function(err){
        if(err){
            console.error(err);
        }
        console.error("Workspace is successfully created");

    });

    res.redirect('/workspaces?toasts=Workspace Successfully Created.');
}


// const Workspace = require('../../models')['Workspace'];

// exports.index = (req, res) => {
//     res.status(200).json({'msg': 'Hello bookmark'});
// }

// exports.show = (req, res) => {
//     let id = req.params.id;
//     let user = req.user;
// console.log(req)
//     if (!user) {
//         return res.status(401).json({msg: 'You need login'});
//     }

//     Workspace.findOne({
//         where: {
//             bookmark_id: id
//         }
//     })
//         .then(result => {

//             return result ? res.status(200).json(result) : res.status(200).json({message: 'empty'})

//         });
// }

// exports.list = (req, res) => {
//     let pageno = req.query.pageno ? req.query.pageno * 10 : 0;
//     let user = req.user;

//     if (!user) {
//         return res.status(401).json({msg: 'You need login'});
//     }

//     Workspace.findAll({
//         offset: pageno,
//         limit: 10
//     })
//         .then(result => {

//             return result.length ? res.status(200).json(result) : res.status(200).json({message: 'empty'})

//         })
// }

// exports.destroy = (req, res) => {
//     let id = req.params.id;
//     let user = req.user;

//     if (!user) {
//         return res.status(401).json({msg: 'You need login'});
//     }

//     Workspace.destroy({
//         where: {
//             bookmark_id: id,
//             bookmark_user: user
//         }
//     })
//         .then(bookmark => {
//             if (!bookmark) {
//                 return res.status(404).json({error: 'No Workspace'});
//             }
//             return res.status(204).send();
//         });
// }

// exports.create = (req, res) => {
//     let id = req.body.search_seq;
//     let user = req.user;

//     if (!user) {
//         return res.status(401).json({msg: 'You need login'});
//     }

//     Workspace.findOne({
//         where: {
//             bookmark_id: id
//         }
//     })
//         .then(data => {
//             if (!data) {

//                 Workspace.create({
//                     bookmark_id: id,
//                     bookmark_user: user
//                 })
//                     .then(data => {
//                         return res.status(200).json({msg: 'success', value: JSON.stringify(data)});
//                     })

//             } else {
//                 return res.status(400).json({msg: 'duplicate'});
//             }
//         })
// }