const mongoose = require('mongoose');
var rp = require('request-promise');

var Workspace = mongoose.model('Workspace');
var User = mongoose.model('User');

var util = require('../../util')


exports.create = (req, res, callback) => {

	const {name, description, endpoint, port} = req.body

	var jupyterParam = {
		'id' : name,
		'ws' : endpoint,
		'port' : port
	}

	console.log("jupyter creation began")

	console.log("$$$$$"+req.app.get('base-uri'))
	var options = {
	    method: 'POST',
	    uri: req.app.get('base-uri')+'/workspaces/generate/jupyters',
	    body: jupyterParam,
	    json: true, // Automatically stringifies the body to JSON
	    rejectUnauthorized: false
	};

	console.log("#####"+options.uri)
 
	rp(options)
    	.then(function (parsedBody) {
        // POST succeeded...
        	res.json("parsedBody : "+parsedBody)
    	})
    	.catch(function (err) {
        // POST failed...
        	res.json("err : "+err)
    	});


    // $.post('/generate/jupyter', body, function(err, status){
    //     // console.log("%%%%%"+data);
    //     res.json(err)
    // });



}

exports.show = (req, res, callback) => {
	
}