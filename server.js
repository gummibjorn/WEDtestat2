"use strict";
var express = require('express');
var session = require('express-session');
var routes = require('./routes');
var links = require('./routes/links');
var login = require('./routes/login');
var app = express();
var storage = require('./storage.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.use(session({secret: '1234567890QWERTY', saveUninitialized:false, resave:false, cookie: { maxAge: 60000}}));
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var requireLogin = function(req, res, next){
  if(req.session.user){
    next();
  } else {
    res.writeHead(403);
    res.end();
  }
};

app.get('/LinkIt', routes.index);
app.get('/', routes.index);

app.put('/links', requireLogin, jsonParser, links.putlinks);

app.delete('/links/:id', requireLogin, links.delete);

app.get('/links', links.getlinks);


app.post('/links/:id/up', requireLogin, links.upvote);

app.post('/links/:id/down', requireLogin, links.downvote);

//Login handling
app.get('/login', login.getuser);

app.post('/login', jsonParser, login.userlogin);

app.delete('/login', requireLogin, login.userlogout );

//temp demo data
storage.add({
  title: "In our house, CAT boops YOU",
  url: "http://i.imgur.com/RgBHlbG.gifv",
  rank: 146,
  user: 'tourn',
  date: new Date()
});
storage.add({
  title: "Cat saloon",
  url: "http://i.imgur.com/RYpsy6X.gif",
  rank: 10,
  user: 'hans',
  date: new Date()
});
storage.add({
  title: "Acatin's Creed",
  url: "http://i.imgur.com/oMmQ0ue.gifv",
  rank: 44,
  user: 'tourn',
  date: new Date()
});
storage.add({
  title: "Broken link without http",
  url: "trq.ch",
  rank: -12,
  user: 'tourn',
  date: new Date()
});


var server = app.listen(8000, function(){
  console.log("AAAAND we're up.");
});
