var session = require('express-session');

exports.getuser = function(req, res, next){
  res.writeHead(200, {
    'Content-Type' : 'application/json'
  });
  var user = req.session.user || null;
  res.end(JSON.stringify(user));
};

exports.userlogin = function(req, res, next){
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
};

exports.userlogout = function(req, res, next){
  req.session.user = null;
  res.writeHead(200);
  res.end();
};
