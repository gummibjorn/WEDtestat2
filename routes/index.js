var storage = require('../storage.js');

var titles = ['SawIt', 'SeenIt', 'ReadIt', 'LinkIt', 'ScrewIt', 'EatIt', 'MegabIt', 'NoobIt', 'SproinkIt', 'ChairIt', 'RebootIt', 'CloseIt', 'BookmarkIt', 'LoveIt', 'HateIt', 'dontcareaboutIt', 'BathsIt', 'ReloadIt', 'BelieveIt', 'PayIt', 'PostIt'];

exports.index = function(req, res){
  var title = titles[Math.floor(Math.random()*titles.length)];
  res.render('index', { title: title, user: req.session.user });
};
