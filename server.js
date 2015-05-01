"use strict";
var express = require('express');
var routes = require('./routes')
var app = express();
var storage = require('./storage.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/LinkIt', routes.index);

app.get('/', function(req,res){
  res.writeHead(200, {
      'Content-Type' : 'text/plain'
  });
  res.end('Hi');
});

app.put('/links', jsonParser, function(req, res, next){
  var link = {
    title: req.body.title,
    url: req.body.url,
    rank: 0,
    user: req.body.user, //FIXME: don't get this from the request, but from the user authentication
    date: new Date()
  };
  //TODO: error validation: invalid url, empty title (send back 400 code and error message then)
  storage.add(link);
  res.writeHead(200);
  res.end(JSON.stringify(link));
});

app.delete('/links/:id', function(req, res, next){
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


app.post('/links/:id/up', function(req, res, next){
	storage.get(req.params.id).rank++;
	res.writeHead(200);
	res.end();
});

app.post('/links/:id/down', function(req, res, next){
	storage.get(req.params.id).rank--;
	res.writeHead(200);
	res.end();
});

//User handling

app.get('/login', function(req, res, next){
  res.writeHead(200, {
  'Content-Type' : 'application/json'
  });
  res.end();
});

app.post('/login', function(req, res, next){
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
