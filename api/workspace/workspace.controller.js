const mongoose = require('mongoose');
var rp = require('request-promise');


var Workspace = mongoose.model('Workspace');
var User = mongoose.model('User');

var util = require('../../util')

exports.index = (req, res, callback) => {

    var workspaces = [];

    Workspace.find({ user: mongoose.Types.ObjectId(req.cookies.userId)}).populate('user', 'username').exec().then((object) => {
        // console.log("####"+JSON.stringify(object))
      res.render('workspaces/index', {workspaces: object})
    });
}

exports.show = (req, res) => {

    var workspaceId = req.params.workspaceId

    var options = {
        method: 'GET',
        uri: req.app.get('base-uri')+'/workspaces/'+workspaceId+'/k8s.jsonp',
        json: true, // Automatically stringifies the body to JSON
        rejectUnauthorized: false
    };

    // console.log("#####"+options.uri)
 
    rp(options)
        .then(function (elems) {
        // POST succeeded...


            // console.log("******"+elems)
            var pods = []
            var networkIDE = []
            var dAppIDE = []
            var contractIDE = []
            var podIds = Object.keys(elems)
            // console.log("elems : "+JSON.strcingify(elems))

            console.log("podIds : "+podIds)
            podIds.forEach((podId)=>{
                var elem = elems[podId]
                var pod = {}

                pod.name = elem.metadata.name
                pod.kind = elem.kind
                pod.url = "http://"+elem.status.hostIP
                pod.app = elem.metadata.labels.app
                pod.createdAt = elem.metadata.creationTimestamp
                
                if (pod.app === "ide"){
                    pod.app = elem.spec.containers[0].name
                    pod.hostNode = elem.spec.nodeName
                // if (typeof elem.spec.containers[0].ports !== "undefined")
                    pod.url += ":"+ elem.spec.containers[0].ports[0].hostPort
                }
                
                // console.log("$$$$$$pod.app : " + pod.app)
                // console.log("$$$$$$elem.spec.containers[0].name : " + elem.spec.containers[0].name)

                

                switch (pod.app){
                case "dappide" :
                    dAppIDE.push(pod)
                    break
                case "remix-ide" : 
                    contractIDE.push(pod)
                    break
                case "kuberneteth" : 
                    networkIDE.push(pod)
                }

                pods.push(pod)
            })

            // pods.forEach 
            Workspace.findById(workspaceId).exec().then((workspace)=>{
                console.log("######"+workspace)
                res.render('workspaces/show', {
                    workspace : workspace,
                    networkIDE : networkIDE,
                    dAppIDE : dAppIDE,
                    contractIDE : contractIDE
                })        
            });            
        })
        .catch(function (err) {
        // POST failed...
            res.json("err : "+err)
        })



    // res.render('workspaces/show', {
    //     workspace: {
    //         id: 'testWorkspaceId01',
    //         name: 'testWorkspaceName01',
    //         description : 'testWorkspaceName01 is the best workspace ever! \n Because testWorkspace is in the best blockchain network which is provided by Chaining.',
    //         type: 'Ethereum',
    //         createdAt: new Date().toDateString()
    //     }
    // });
}

exports.new = (req, res) => {
    res.render('workspaces/new', {title : 'Chaining'});
}

exports.create = (req, res) => {


    var workspaceParam = req.body;
    workspaceParam.createdAt = Date().toLocaleString();

    workspaceParam.user = mongoose.Types.ObjectId(req.cookies.userId)

    Workspace.create(workspaceParam, function(err, workspace){
        if (err||!workspace) 
            res.render('workspaces/new', {result : util.successFalse(err)});
            // res.json(util.successFalse(err))
            // res.render('/workspaces/new', {result : util.successFalse(err), form: workspaceParam});
        else
            // res.json(util.successTrue())
            res.render('workspaces/index', {result : util.successTrue(workspace)});
        // res.json(err||!user? util.successFalse(err): util.successTrue(user));
    });

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