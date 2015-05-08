var storage = require('../storage.js');
var middleware = require('../middleware.js');
var requireLogin = middleware.requireLogin;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var express = require('express');
var links = express.Router();

links.put('/', requireLogin, jsonParser, function(req, res, next){   
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

links.delete('/:id', requireLogin, function(req, res, next){
  if(req.session.user == storage.get(req.params.id).user){
    storage.remove(req.params.id);
        res.writeHead(200);
  	res.end();
  }else{
    res.writeHead(401, {
      'Content-Type' : 'text/plain'
    });
    res.end('not allowed to delete this item');
  }
});

links.get('/', function(req, res, next){
  res.writeHead(200, {
      'Content-Type' : 'application/json'
  });
  res.end(JSON.stringify(storage.getAll()));
});

links.post('/:id/up', requireLogin, function(req, res, next){
	storage.get(req.params.id).rank++;
	res.writeHead(200);
	res.end();
});

links.post('/:id/down', requireLogin, function(req, res, next){
	storage.get(req.params.id).rank--;
	res.writeHead(200);
	res.end();
});

module.exports = links;
