'use strict';


var cloudinary = require('cloudinary');
var tempcloudinary = require('cloudinary');
var url  = require('url');
var local_file_path = "";

var multer = require('multer');

var Storage = multer.diskStorage({
	destination: function(req, file, callback) {
	 callback(null, "./public/files");
	},
	filename: function(req, file, callback) {
	 var file_name = file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s+/g, '_').toLowerCase();
	 callback(null, file_name);
	 local_file_path = file_name;
	}
});

var upload = multer({
	storage: Storage
}).array("imgUploader", 3); //Field name and max count


// cloudinary.config({ 
//  cloud_name: 'dtrj5hqdm', 
//  api_key: '415183322599141', 
//  api_secret: 'LUhuCC5Iw5V3hizFzPFdztazwLI' 
// });

cloudinary.config({ 
 cloud_name: 'dosxjzleb', 
 api_key: '652824273966278', 
 api_secret: 'K2oWfPXPXTm9PTGZD47bFQnIGAI' 
});

tempcloudinary.config({ 
 cloud_name: 'intellirio-consultancy-and-labs-llp', 
 api_key: '579673852831583', 
 api_secret: 'BCArjT98AV1jmrSwL45DNnlK_DE' 
});


exports.list_all_images = function(req, res) {
	cloudinary.v2.api.resources(function(error, result){
		res.json(result.resources);
	});
};

exports.uploadimages = function(req, res) {
	console.log(req.body);
	cloudinary.v2.uploader.upload(req.body.url, function(error, result) {
		if (result) {
			res.json(result);
		}else{
			res.json(error);
		}
	});
};


exports.list_featured_images = function(req, res) {
	var query_params = url.parse(req.url,true).query;
	if(query_params.tagId != undefined){
		cloudinary.v2.api.resources_by_tag(query_params.tagId, function(error, result){
			res.json(result.resources);
		});
	}else{
		cloudinary.v2.api.resources(function(error, result){
			res.json(result.resources);
		});
	}
};

exports.upload_images_to_local = function(req, res) {
     upload(req, res, function(err) {
         if (err) {
         	console.log(err);
            return res.end("Something went wrong!");
         }
         console.log("SUBHA TESTING");
         console.log(req.protocol + "://" + req.host + '/files/' + local_file_path);
         res.json({"secure_url": req.protocol + "://" + req.host + ':8000/files/' + local_file_path});
     });
};

exports.upload_images_to_temp = function(req, res) {
	console.log(req.body);
	tempcloudinary.v2.uploader.upload(req.body.url, function(error, result) {
		if (result) {
			res.json(result);
		}else{
			res.json(error);
		}
	});
};



// exports.create_a_task = function(req, res) {
//   var new_task = new Task(req.body);
//   new_task.save(function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.read_a_task = function(req, res) {
//   Task.findById(req.params.taskId, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.update_a_task = function(req, res) {
//   Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.delete_a_task = function(req, res) {


//   Task.remove({
//     _id: req.params.taskId
//   }, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'Task successfully deleted' });
//   });
// };


