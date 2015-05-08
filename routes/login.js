var express = require('express');
var login = express.Router();
var server = require('../server.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var middleware = require('../middleware.js');
var requireLogin = middleware.requireLogin;


login.get('/', function(req, res, next){
  res.writeHead(200, {
    'Content-Type' : 'application/json'
  });
  var user = req.session.user || null;
  res.end(JSON.stringify(user));
});

login.post('/', jsonParser, function(req, res, next){
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

login.delete('/', requireLogin, function(req, res, next){
  req.session.user = null;
  res.writeHead(200);
  res.end();
});

module.exports = login;
