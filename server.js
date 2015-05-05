"use strict";
var express = require('express');
var session = require('express-session');
var routes = require('./routes');
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

app.put('/links', requireLogin, jsonParser, function(req, res, next){   
  var regex = new RegExp("https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}");
  if(req.body.url.match(regex)){
    var link = {
      title: req.body.title,
      url: req.body.url,
      rank: 0,
      user: req.session.user, 
      date: new Date()
    };
    storage.add(link);
    res.writeHead(200);
    res.end(JSON.stringify(link));
  }else{
    res.writeHead(400, {
      'Content-Type' : 'text/plain'
    });
    res.end('wrong URL');
  }
});

app.delete('/links/:id', function(req, res, next){
  //TODO verify user
	storage.remove(req.params.id);
        res.writeHead(200);
	res.end();
});

app.get('/links', function(req, res, next){
  res.writeHead(200, {
      'Content-Type' : 'application/json'
  });
  res.end(JSON.stringify(storage.getAll()));
});


app.post('/links/:id/up', requireLogin, function(req, res, next){
	storage.get(req.params.id).rank++;
	res.writeHead(200);
	res.end();
});

app.post('/links/:id/down', requireLogin, function(req, res, next){
	storage.get(req.params.id).rank--;
	res.writeHead(200);
	res.end();
});

//Login handling
app.get('/login', function(req, res, next){
  res.writeHead(200, {
    'Content-Type' : 'application/json'
  });
  var user = req.session.user || null;
  res.end(JSON.stringify(user));
});

app.post('/login', jsonParser, function(req, res, next){
  var user = req.body.user;
  if(user){
    req.session.user = user;
    res.writeHead(200);
    res.end();
  } else {
    res.writeHead(400);
    res.end();
    //TODO error message
  }
});

app.delete('/login', function(req, res, next){
  req.session.user = null;
  res.writeHead(200);
  res.end();
});

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
