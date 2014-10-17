var Q = require('q');
var model = require('../model');

exports.index = function(req, res) {
    res.render('index', {});
};

exports.list = function(req, res) {
    res.render('list', {
      title: req.params.id
    });
};

exports.objective = function(req, res) {
    res.render('objective', {
      id: req.params.id,
      by: req.params.id,
      title: req.params.id
    });
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

exports.getObjectiveById = function(req, res) {
  Q.all([
    Q.ninvoke(model, 'getObjectiveById', req.params.id),
  ])
  .spread(function(objectives) {
    res.json(objectives);
  })
  .fail(function (err) {
    return next(err);
  });
};
