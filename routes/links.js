var session = require('express-session');
var storage = require('../storage.js');

exports.putlinks = function(req, res, next){   
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
};

exports.delete = function(req, res, next){
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
};

exports.getlinks = function(req, res, next){
  res.writeHead(200, {
      'Content-Type' : 'application/json'
  });
  res.end(JSON.stringify(storage.getAll()));
};

exports.upvote = function(req, res, next){
	storage.get(req.params.id).rank++;
	res.writeHead(200);
	res.end();
};

exports.downvote = function(req, res, next){
	storage.get(req.params.id).rank--;
	res.writeHead(200);
	res.end();
};
