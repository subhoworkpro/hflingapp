'use strict';
var nodemailer = require('nodemailer');

var Cryptr = require('cryptr'),
cryptr = new Cryptr('Ji5RW2BlJ6');

module.exports = function(apiRoutes) {

  apiRoutes.post('/sendMail', function(req, res) {

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 25,
        auth: {
            user: 'info@healthyfling.com',
            pass: 'photography99'
        }
    });

    if (req.body) {
      var text = req.body.message;

      var link = req.body.link || "";

      var replyAddr = "";

      if (req.body['x-post-id'] && req.body['x-from']) {
        replyAddr = req.body['x-post-id']+"-"+cryptr.encrypt(req.body['x-from'])+"-reply@healthyfling.com"
        // replyAddr = req.body['x-from']
      }

      var mailOptions = {};
      console.log(req.body);
      if (req.body.htmlmessage) {
        text = req.body.htmlmessage || req.body.message;
        mailOptions = {
            from: 'Healthy Fling <info@healthyfling.com>', // sender address
            to: [req.body.sender1,req.body.sender2], // list of receivers
            subject: 'Healthy Fling: '+req.body.subject, // Subject line
            html: "<b>Greeting!</b> <br/>"+text+"\n\n"+link,
            replyTo: replyAddr
            // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
        };
      }else{

        mailOptions = {
            from: 'Healthy Fling <info@healthyfling.com>', // sender address
            to: [req.body.sender1,req.body.sender2], // list of receivers
            subject: 'Healthy Fling: '+req.body.subject, // Subject line
            text: "Greeting! \n\n"+text+"\n\n"+link,
            replyTo: replyAddr
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
