"use strict";
var express = require('express');
var session = require('express-session');
var index = require('./routes/index');
var links = require('./routes/links');
var login = require('./routes/login');
var app = express();
var storage = require('./storage.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.use(session({secret: '1234567890QWERTY', saveUninitialized:false, resave:false, cookie: { maxAge: 60000}}));

app.use('/links', links);
app.use('/login', login);
app.use('/LinkIt', index);
app.use('/', index);

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

//TODO: try to export the middleware from server.js
/*function requireLogin(req, res, next){
  if(req.session.user){
    next();
  } else {
    res.writeHead(403);
    res.end();
  }
};*/

//temp data
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
