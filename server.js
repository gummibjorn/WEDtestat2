"use strict";
var express = require('express');
var app = express();
var Storage = require('./storage.js');
var storage = new Storage();

app.use(express.static('public'));


app.get('/', function(req,res){
  res.writeHead(200, {
      'Content-Type' : 'text/plain'
  });
  res.end('Hi');
});

app.put('/links', function(req, res, next){
  data = {} // TODO get from request body
  storage.add({
    title: data.title,
    url: data.url,
    rank: 0,
    user: data.user,
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
