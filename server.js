var express = require('express');

var nodemailer = require('nodemailer');

var app = express();

// API ROUTES -------------------

// get an instance of the router for api routes
var apiRoutes = express.Router(); 

var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
mongoose.Promise = global.Promise
var CryptoJS = require("crypto-js");

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./api/models/user'); // get our mongoose model

var port = process.env.PORT || 8000;
mongoose.connect(config.database, { useMongoClient: true }); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false, limit:'5mb' }));
app.use(bodyParser.json({limit:'5mb'}));

// use morgan to log requests to the console
app.use(morgan('dev'));

console.log(CryptoJS.AES.encrypt('my message', config.key).toString());

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {

	// find the user
	User.findOne({
	  name: req.body.name
	}, function(err, user) {

	  if (err) throw err;

	  if (!user) {
	    res.json({ success: false, message: 'Authentication failed. User not found.' });
	  } else if (user) {

	  	var bytes  = CryptoJS.AES.decrypt(user.password, config.key);
		var password = bytes.toString(CryptoJS.enc.Utf8);

	    // check if password matches
	    if (password != req.body.password) {
	      res.json({ success: false, message: 'Authentication failed. Wrong password.' });
	    } else {

	      // if user is found and password is right
	      // create a token with only our given payload
	  // we don't want to pass in the entire user since that has the password
	  const payload = {
	    admin: user.admin 
	  };
	      var token = jwt.sign(payload, app.get('superSecret'));

	      // return the information including token as JSON
	      res.json({
	        success: true,
	        message: 'Enjoy your token!',
	        token: token
	      });
	    }   

	  }

	});
});

 // route middleware to verify a token
// apiRoutes.use(function(req, res, next) {

//   // check header or url parameters or post parameters for token

//   var token = req.body.token || req.query.token || req.headers['x-access-token'];

 
//   // decode token
//   if (token) {

//     // verifies secret and checks exp
//     jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
//       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });    
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;    
//         next();
//       }
//     });

//   } else {

//     // if there is no token
//     // return an error
//     return res.status(403).send({ 
//         success: false, 
//         message: 'No token provided.' 
//     });

//   }
// });

var routes = require('./api/routes/galleryRoutes'); //importing route
routes(apiRoutes);

var userRoutes = require('./api/routes/userRoutes'); //importing route
userRoutes(apiRoutes);

var postRoutes = require('./api/routes/postRoutes'); //importing route
postRoutes(apiRoutes);

var mailRoutes = require('./api/routes/mailRoutes'); //importing route
mailRoutes(apiRoutes);

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

app.use(express.static('public'))

// // application -------------------------------------------------------------
// app.get('*', function (req, res) {
//     res.sendFile(__dirname + '/public/404.html'); // load the single view file (angular will handle the page changes on the front-end)
// });


app.listen(port);

console.log('Healthy Fling server started on: ' + port);