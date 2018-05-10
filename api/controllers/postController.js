'use strict';

var Post = require('../models/post');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
            user: 'info@healthyfling.com',
            pass: 'photography99'
    }
});

var cloudinary = require('cloudinary');
var url  = require('url');


cloudinary.config({ 
  cloud_name: 'dtrj5hqdm', 
  api_key: '415183322599141', 
  api_secret: 'LUhuCC5Iw5V3hizFzPFdztazwLI' 
});


exports.list_all_images = function(req, res) {
	cloudinary.v2.api.resources(function(error, result){
		res.json(result.resources);
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


exports.create_a_post = function(req, res) {
  console.log(req.body);
  console.log(req.body.state);	
  var new_post = new Post({
            title: req.body.title,
  					state: req.body.state, 
				    region: req.body.region,
				    category: req.body.category,
				    location: req.body.location, 
				    age: req.body.age,
				    body: req.body.message,
				    email: req.body.email,
            files: req.body.files,
            status: "inactive"
	  			});
  new_post.save(function(err, post) {
    if (err)
      res.send(err);

    var mailBody = "Greeting! \n\n"+ "Your ad has been posted successfully. \n\nPlease click on the below link to verify." + "\n"+"http://healthyfling.com/api/verifypost/"+post['_id']+"\n\n Regards, \n\n Healthyfling Team.";
    var mailOptions = {
        from: 'Healthy Fling <info@healthyfling.com>', // sender address
        to: post.email,
        subject: "Healthy Fling: "+ post.title,
        text: mailBody
    };


    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        };
    });

    res.json(post);
  });
};


exports.read_a_post = function(req, res) {
  Post.findById(req.params.postId, function(err, post) {
    if (err)
      res.send(err);
    res.json(post);
  });
};

exports.verifypost = function(req, res) {
  Post.findById(req.params.postId, function(err, post) {
    if (err)
      res.send(err);
    post.status = "active";
    post.save(function(err, post) {
      if (err)
        res.send(err);
      res.redirect("/#/detail/"+post["_id"]+"?success=true");
      
    });
  });
};

exports.read_all_posts = function(req, res) {

  var date = new Date();
  var daysToDeletion = 2;
  var deletionDate = new Date(date.setDate(date.getDate() - daysToDeletion));

  var query_params = url.parse(req.url,true).query; 
  query_params.created = {$gt : deletionDate};
  query_params.status = "active";
  var query = {
    state : 'STATE1'
  };  

  console.log(query_params);
  Post.find(query_params, function (err, posts) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(posts); // return all todos in JSON format
    });

};


// exports.update_a_post = function(req, res) {
//   Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


exports.delete_a_post= function(req, res) {
  Post.remove({
    _id: req.params.postId
  }, function(err, post) {
    if (err)
      res.send(err);
    res.json({ message: 'post successfully deleted' });
  });
};
