'use strict';
var nodemailer = require('nodemailer');

module.exports = function(apiRoutes) {

  apiRoutes.post('/sendMail', function(req, res) {

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'healthyfling@gmail.com', // Your email id
            pass: 'photography88' // Your password
        }
    });

    if (req.body) {
      var text = req.body.message;

      var link = req.body.link || "";

      var mailOptions = {};

      if (req.body.htmlmessage) {
        text = req.body.htmlmessage || req.body.message;
        mailOptions = {
            from: 'healthyfling@gmail.com', // sender address
            to: [req.body.sender1,req.body.sender2], // list of receivers
            subject: 'Healthy Fling: '+req.body.subject, // Subject line
            html: "<b>Greeting!</b> <br/>"+text+"\n\n"+link
            // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
        };
      }else{

        mailOptions = {
            from: 'healthyfling@gmail.com', // sender address
            to: [req.body.sender1,req.body.sender2], // list of receivers
            subject: 'Healthy Fling: '+req.body.subject, // Subject line
            text: "Greeting! \n\n"+text+"\n\n"+link
            // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
        };

      }


      transporter.sendMail(mailOptions, function(error, info){
          if(error){
              console.log(error);
              res.json({yo: 'error'});
          }else{
              console.log('Message sent: ' + info.response);
              res.json({yo: info.response});
          };
      });
    }

  });

  // app.route('/tasks/:taskId')
  //   .get(todoList.read_a_task)
  //   .put(todoList.update_a_task)
  //   .delete(todoList.delete_a_task);
};
