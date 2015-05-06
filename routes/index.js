var storage = require('../storage.js');

exports.index = function(req, res){
        res.render('index', { title: 'SawIt', user: req.session.user });
};
