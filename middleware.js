function requireLogin(req, res, next){
  if(req.session.user){
    next();
  } else {
    res.writeHead(403);
    res.end();
  }
};

module.exports = {
  requireLogin: requireLogin
}
