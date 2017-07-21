var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  console.log('Hello World');
  res.render('index',{title: 'Welcome'});
});

app.get('/about', function(req, res) {
  console.log('Hello World');
  res.render('about');
});

app.get('/contact', function(req, res) {
  console.log('Hello World');
  res.render('contact');
});

app.post('/contact/send', function(req, res) {
  var transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'matthewrzepka@gmail.com',
      pass: 'Cody1234'
    }
  });

  var mailOptions = {
    from: 'Matt Rzepka <matthewrzepka@gmail.com>',
    to: 'matthewrzepka@gmail.com',
    subject: 'Website submission',
    text: 'You have a submission with the following details... Name: '+ req.body.name+' Email: '+req.body.email+' Message: '+req.body.message,
    html: '<p>You have a submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li><ul>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error) {
      console.log('error');
    } else {
      console.log('Message Sent'+info.response);
    }
    res.redirect('/');
  });
});

app.listen(3000);
console.log('server is running on port 3000...');
