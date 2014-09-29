var Q = require('q');
var model = require('../model');

exports.index = function(req, res) {
    res.render('index', {});
};

exports.getObjective = function(req, res) {
  Q.all([
    Q.ninvoke(model, 'getObjective'),
  ])
  .spread(function(objectives) {
    console.log(objectives);
    res.json(objectives);
  })
  .fail(function (err) {
    return next(err);
  });
};


exports.addObjective = function(req, res) {
  console.log(req.params.name);
  Q.all([
    Q.ninvoke(model, 'addObjective', req.params.name),
  ])
  .spread(function(objective) {
    console.log(objective);
    res.json(objective);
  })
  .fail(function (err) {
    return next(err);
  });
};
