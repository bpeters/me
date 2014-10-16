var Q = require('q');
var model = require('../model');

exports.index = function(req, res) {
    res.render('index', {});
};

exports.getCity = function(req, res) {
  Q.all([
    Q.ninvoke(model, 'getCity'),
  ])
  .spread(function(cities) {
    res.json(cities);
  })
  .fail(function (err) {
    return next(err);
  });
};

exports.getCityById = function(req, res) {
  Q.all([
    Q.ninvoke(model, 'getCityById', req.params.id),
  ])
  .spread(function(city) {
    res.json(city);
  })
  .fail(function (err) {
    return next(err);
  });
};

exports.getObjective = function(req, res) {
  Q.all([
    Q.ninvoke(model, 'getObjective'),
  ])
  .spread(function(objectives) {
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
    res.json(objective);
  })
  .fail(function (err) {
    return next(err);
  });
};
