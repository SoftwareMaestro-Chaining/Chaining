const mongoose = require('mongoose');
var rp = require('request-promise');

var Workspace = mongoose.model('Workspace');
var User = mongoose.model('User');

var util = require('../../util')


exports.create = (req, res, callback) => {

	const {name, description, endpoint, port} = req.body

	var remixParam = {
		'id' : name,
		'ws' : endpoint,
		'port' : port
	}

	console.log("remix creation began")

	var options = {
	    method: 'POST',
	    uri: req.app.get('base-uri')+'/generate/remixes',
	    body: remixParam,
	    json: true // Automatically stringifies the body to JSON
	};
 
	rp(options)
    	.then(function (parsedBody) {
        // POST succeeded...
        	res.json("parsedBody : "+parsedBody)
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