"use strict";
var express = require('express');
var app = express();
var Storage = require('./storage.js');
var storage = new Storage();
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json()

app.use(express.static('public'));


app.get('/', function(req,res){
  res.writeHead(200, {
      'Content-Type' : 'text/plain'
  });
  res.end('Hi');
});

app.put('/links', jsonParser, function(req, res, next){
  storage.add({
    title: req.body.title,
    url: req.body.url,
    rank: 0,
    user: req.body.user,
    date: new Date()
  });
  res.writeHead(200, {
      'Content-Type' : 'application/json'
  });
  res.end();
});
app.delete('/links/:id', function(req, res, next){});
app.get('/links', function(req, res, next){
  res.writeHead(200, {
      'Content-Type' : 'application/json'
  });
  res.end(JSON.stringify(storage.links));
});
app.post('/links/:id/up', function(req, res, next){});
app.post('/links/:id/down', function(req, res, next){});

var server = app.listen(8000, function(){
  console.log("AAAAND we're up.");
});
