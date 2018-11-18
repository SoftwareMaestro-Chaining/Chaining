const mongoose = require('mongoose');
var exec = require('child_process').exec;



var Workspace = mongoose.model('Workspace');
var User = mongoose.model('User');


exports.core = function(app){
	var crud = {}

	crud.app = app;
	// console.log(app);
	crud.destroy =  ( req, res, callback) => {
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
	};
	crud.create = ( req, res, callback) => {
		
		const {name, description, workspaceId, port} = req.body

		var param = {
			'app' :  crud.app,
			'id' : name,
			'ws' : workspaceId,
			'port' : port
		}
		// req.body.app = 'remix'
		require('./generator')(param, (data)=>{
			res.json(data);
		})
	}
	crud.show = (req, res, callback) => {
	
	}

	return crud;
};