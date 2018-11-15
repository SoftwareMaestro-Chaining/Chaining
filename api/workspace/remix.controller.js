const mongoose = require('mongoose');
var rp = require('request-promise');

var Workspace = mongoose.model('Workspace');
var User = mongoose.model('User');

var util = require('../../util')


exports.create = (req, res, callback) => {

	const {name, description, workspaceId, port} = req.body

	var remixParam = {
		'id' : name,
		'ws' : workspaceId,
		'port' : port
	}

	// console.log("remix creation began")

	// console.log("$$$$$"+req.app.get('base-uri'))
	var options = {
	    method: 'POST',
	    uri: req.app.get('base-uri')+'/workspaces/generate/remixs',
	    body: remixParam,
	    json: true, // Automatically stringifies the body to JSON
	    rejectUnauthorized: false
	};

	// console.log("#####"+options.uri)
 
	rp(options)
    	.then(function (parsedBody) {
        // POST succeeded...
        	// res.render("/workspaces/"+workspaceId, )
        	// res.json("parsedBody : "+JSON.stringify(parsedBody))
			res.redirect("/workspaces/"+workspaceId)

    	})
    	.catch(function (err) {
        // POST failed...
        	res.json("err : "+err)
    	});


    // $.post('/generate/remix', body, function(err, status){
    //     // console.log("%%%%%"+data);
    //     res.json(err)
    // });



}

exports.show = (req, res, callback) => {
	
}