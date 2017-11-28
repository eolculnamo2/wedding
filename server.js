var mongo = require('mongodb')
var mongoose = require('mongoose')
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var db = require('./db/data')
var app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));


app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/details", function (request, response) {
  response.sendFile(__dirname + '/views/details.html');
});

app.get("/rsvp", function (request, response) {
  db.list((list)=>{
     response.render(__dirname + '/views/rsvp.ejs',{
       list: list
     });
  });
 
});

app.get("/photos", function (request, response) {
  response.sendFile(__dirname + '/views/photos.html');
});

app.get("/guestDetails", function (request, response) {
  response.sendFile(__dirname + '/guests.html');
});
app.post("/rsvpSubmitted", function (request, response) {

  
  var guest = db.guests;
  console.log(guest)
    var newGuest = new guest({
       first: request.body.firstName,
      last: request.body.lastName,
       phone: request.body.phoneNumber,
       email: request.body.email,
       comment: request.body.message
     })
    
    newGuest.save();
    response.redirect('/rsvp')
  
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
