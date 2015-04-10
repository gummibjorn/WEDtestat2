var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function(req,res){
  res.writeHead(200, {
      'Content-Type' : 'text/plain'
  });
  res.end('Hi');
});

app.put('/links', function(req, res, next){});
app.delete('/links/:id', function(req, res, next){});
app.get('/links', function(req, res, next){});
app.links('/links/:id/up', function(req, res, next){});
app.links('/links/:id/down', function(req, res, next){});

var server = app.listen(8000, function(){
  console.log("AAAAND we're up.");
});
