const mongoose = require('mongoose');
var rp = require('request-promise');
var exec = require('child_process').exec;



var Workspace = mongoose.model('Workspace');
var User = mongoose.model('User');

var util = require('../../util')


// function puts(error, stdout, stderr) { sys.puts(stdout) }


exports.create = (req, res, callback) => {

	const {name, description, workspaceId, port} = req.body

	var jupyterParam = {
		'id' : name,
		'ws' : workspaceId,
		'port' : port
	}

	// console.log("jupyter creation began")

	// console.log("$$$$$"+req.app.get('base-uri'))
	var options = {
	    method: 'POST',
	    uri: req.app.get('base-uri')+'/workspaces/generate/jupyters',
	    body: jupyterParam,
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


    // $.post('/generate/jupyter', body, function(err, status){
    //     // console.log("%%%%%"+data);
    //     res.json(err)
    // });



}

exports.destroy = (req, res, callback) => {
	// exec("ls -la", function(error, stdout, stderr) {
	// 	  if (!error) {
	// 	    // things worked!
	// 	    console.log(stdout)
	// 	  } else {
	// 	    // things failed :(
	// 	  }
	// });
	exec("kubectl delete -f ./generator/lib/"+req.params.jupyterName+"_template.yaml", (error, stdout, stderr) => {
		if (!error) {
			console.log(stdout)
			exec("rm ./generator/lib/"+req.params.jupyterName+"_template.yaml", (error, stdout, stderr) => {
				if (!error) {
					console.log(stdout)
					res.redirect("/workspaces/"+req.params.workspaceId)
				} else {
					console.log(stderr)
				}
			})
		} else {
			console.log(stderr)
		}
	});

}
exports.show = (req, res, callback) => {
	
}