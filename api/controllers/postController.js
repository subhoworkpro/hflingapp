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

var MAXIMUM_ALLOWED_POST = 4;
var POSTS_TIMEOUT = 7;
var ADMIN_POSTS_TIMEOUT = 30;


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
            haircolor: req.body.haircolor,
            height: req.body.height,
            ethnicity: req.body.ethnicity,
            orientation: req.body.orientation,
            bodytype: req.body.bodytype,
            eyecolor: req.body.eyecolor,
            mstatus: req.body.mstatus,
            gender: req.body.gender,
            bodyhair: req.body.bodyhair,
            hivstatus: req.body.hivstatus,
            weight : req.body.weight,
            mage : req.body.mage,
            files: req.body.files,
            status: "inactive"
          });

  var date = new Date();
  var daysToDeletion = POSTS_TIMEOUT;
  var deletionDate = new Date(date.setDate(date.getDate() - daysToDeletion));

  var query_params = {};
  query_params.created = {$gt : deletionDate};
  query_params.email = req.body.email;  

  Post.find(query_params, function (err, posts) {
  // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err) {
          res.send(err);
      }
      console.log("Number of post found: "+(posts ? posts.length : 0));
      if(posts && posts.length < MAXIMUM_ALLOWED_POST){
        new_post.save(function(err, post) {
          if (err)
            res.send(err);

          var subject_sufix = "";

          if(post.location || post.age){
            subject_sufix = " -";
            if(post.age){
              subject_sufix = subject_sufix + " " +post.location;
            }
            if(post.location){
              subject_sufix = subject_sufix + " (" +post.location+")";
            }
          }

          // var mailBody = "<b>Greetings!</b><br/>"+ "<p>Thank you for posting in HealthyFling!</p>"+"<p>Click on the following link to verify your submittion. Please <a href='"+"http://healthyfling.com/api/verifypost/"+post['_id']+"'>click here</a></p>"+"<p>If the link doesn't work, please copy and paste the URL in your browser: </p>" +"<p>http://healthyfling.com/api/verifypost/"+post['_id']+"</p><br/><p>Also please be aware:</p><p> - Once your post is verified and published on the site, it cannot be deleted or edited</p><p> - Posts naturally expire after 7 days</p><p style='width: 125px;'><a href='https://www.healthyfling.com'><img alt='healthyfling-logo.png' src='https://www.healthyfling.com/app-content/images/logo.png' style='max-width: 100%;'></a><br></p>";
          var mailBody = "<p style='color: red;'>IMPORTANT - FURTHER ACTION IS REQUIRED TO COMPLETE YOUR REQUEST !!!</p><p>FOLLOW THE WEB ADDRESS BELOW TO:</p><ul><li>PUBLISH YOUR AD</li><li>EDIT (OR CONFIRM AN EDIT TO) YOUR AD</li><li>DELETE YOUR AD</li></ul><p>If not clickable, please copy and paste the address ti your browser:</p><p><span style='color: red;'>THIS LINK IS A PASSWORD. DO NOT SHARE IT </span>- anyone who has a copy of this link can edit or delete your posting.</p>" +"<p>http://healthyfling.com/api/verifypost/"+post['_id']+"</p><p style='color: red;'>PLEASE KEEP THIS EMAIL TO MANAGE YOUR POSTING!</p><p>Your posting will expire off the site 7 days after it was created.</p><p>Thanks for using Healthyfling!</p><p style='width: 125px;'><a href='https://www.healthyfling.com'><img alt='healthyfling-logo.png' src='https://www.healthyfling.com/app-content/images/logo.png' style='max-width: 100%;'></a><br></p>";
          var mailOptions = {
              from: 'Healthy Fling <info@healthyfling.com>', // sender address
              to: post.email,
              subject: "POST/EDIT/DELETE : " + post.title + subject_sufix,
              html: mailBody
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
        console.log("New post added");
      }else{
        console.log("Maximum limit reached");
          var data = {data:"limit reached"};
          res.json(data);
      }
    // console.log(posts[0]);
  });
  
};


// exports.read_a_post = function(req, res) {
//   Post.findById(req.params.postId, function(err, post) {
//     if (err)
//       res.send(err);
//     res.json(post);
//   });
// };


exports.read_a_post = function(req, res) {

  var date = new Date();
  var daysToDeletion = POSTS_TIMEOUT;
  var deletionDate = new Date(date.setDate(date.getDate() - daysToDeletion));

  var query_params = {};
  query_params.created = {$gt : deletionDate};
  query_params.status = "active";
  query_params["_id"] = req.params.postId;
  var query = {
    state : 'STATE1'
  };  

  console.log(query_params);
  Post.find(query_params, function (err, posts) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        // console.log(posts[0]);
        res.json(posts[0]); // return all todos in JSON format
    });

};

exports.admin_read_a_post = function(req, res) {

  var date = new Date();
  var daysToDeletion = ADMIN_POSTS_TIMEOUT;
  var deletionDate = new Date(date.setDate(date.getDate() - daysToDeletion));

  var query_params = {};
  query_params.created = {$gt : deletionDate};
  // query_params.status = "active";
  query_params["_id"] = req.params.postId;
  var query = {
    state : 'STATE1'
  };  

  console.log(query_params);
  Post.find(query_params, function (err, posts) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        // console.log(posts[0]);
        res.json(posts[0]); // return all todos in JSON format
    });

};

exports.verifypost = function(req, res) {
  Post.findById(req.params.postId, function(err, post) {
    var is_edit = false;
    if (err)
      res.redirect("/#/expired");
    if(post == null){
      res.redirect("/#/expired");
    }else{
      if(post.status == "active"){
        is_edit = true;
      }
      post.status = "active";
      post.save(function(err, post) {
        if (err)
          res.redirect("/#/expired");
        if(is_edit){
          res.redirect("/#/detail/"+post["_id"]+"?edit=true");
        }else{
          res.redirect("/#/detail/"+post["_id"]+"?success=true");
        }
        
      });
    }
  });
};

exports.flagpost = function(req, res) {
  Post.findById(req.params.postId, function(err, post) {
    if (err)
      res.send(err);
    post.status = "flagged";
    post.save(function(err, post) {
      if (err)
        res.send(err);

      var subject_sufix = "";

      if(post.location || post.age){
        subject_sufix = " -";
        if(post.age){
          subject_sufix = subject_sufix + " " +post.location;
        }
        if(post.location){
          subject_sufix = subject_sufix + " (" +post.location+")";
        }
      }

      var mailBody = "<b>Greetings!</b><br/>"+ "<p>Your posting in HealthyFling has been flagged!</p>"+"<p>If you feel your post was flagged incorrectly, please contact us for further review.</p><p>You can contact us <a href='https://www.healthyfling.com/#/contact'>here</a></p><p>https://www.healthyfling.com/#/contact</p>";
      var mailOptions = {
          from: 'Healthy Fling <info@healthyfling.com>', // sender address
          to: post.email,
          subject: "[POST FLAGGED] : " + post.title + subject_sufix,
          html: mailBody
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
  });
};


exports.unflagpost = function(req, res) {
  Post.findById(req.params.postId, function(err, post) {
    if (err)
      res.send(err);
    post.status = "active";
    post.save(function(err, post) {
      if (err)
        res.send(err);
      res.json(post);
    });
  });
};



exports.read_all_posts = function(req, res) {

  var date = new Date();
  var daysToDeletion = POSTS_TIMEOUT;
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


exports.admin_read_all_posts = function(req, res) {

  var date = new Date();
  var daysToDeletion = ADMIN_POSTS_TIMEOUT;
  var deletionDate = new Date(date.setDate(date.getDate() - daysToDeletion));

  var query_params = url.parse(req.url,true).query; 
  query_params.created = {$gt : deletionDate};
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

exports.edit_a_post= function(req, res) {
  console.log(req.params);
  console.log(req.body);
  Post.findById(req.params.postId, function(err, post) {
    if (err)
      res.send(err);
    if(req.body.title){
      post.title = req.body.title;
    }
    if(req.body.state){
      post.state = req.body.state;
    }
    if(req.body.region){
      post.region = req.body.region;
    }
    if(req.body.category){
      post.category = req.body.category;
    }
    if(req.body.location){
      post.location = req.body.location;
    }
    if(req.body.age){
      post.age = req.body.age;
    }
    if(req.body.message){
      post.body = req.body.message;
    }


    if(req.body.haircolor){
      post.haircolor = req.body.haircolor;
    }
    if(req.body.height){
      post.height = req.body.height;
    }
    if(req.body.ethnicity){
      post.ethnicity = req.body.ethnicity;
    }
    if(req.body.orientation){
      post.orientation = req.body.orientation;
    }
    if(req.body.bodytype){
      post.bodytype = req.body.bodytype;
    }
    if(req.body.eyecolor){
      post.eyecolor = req.body.eyecolor;
    }
    if(req.body.mstatus){
      post.mstatus = req.body.mstatus;
    }
    if(req.body.gender){
      post.gender = req.body.gender;
    }
    if(req.body.bodyhair){
      post.bodyhair = req.body.bodyhair;
    }
    if(req.body.hivstatus){
      post.hivstatus = req.body.hivstatus;
    }
    if(req.body.weight){
      post.weight = req.body.weight;
    }
    if(req.body.mage){
      post.mage = req.body.mage;
    }


    if(req.body.files){
      post.files = req.body.files;
    }
    // post.status = "inactive";
    post.save(function(err, post) {
      if (err)
        res.send(err);
      res.json(post);
    });
  });
};


exports.delete_a_post= function(req, res) {

  Post.findById(req.params.postId, function(err, post) {
    if (err)
      res.send(err);
    post.status = "inactive";
    post.save(function(err, post) {
      if (err)
        res.send(err);
      res.json({ message: 'post successfully deleted' });
    });
  });

  // Post.remove({
  //   _id: req.params.postId
  // }, function(err, post) {
  //   if (err)
  //     res.send(err);
  //   res.json({ message: 'post successfully deleted' });
  // });
};
