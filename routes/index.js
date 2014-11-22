require('node-jsx').install({extension: '.jsx'});
var App = require('../react/App.jsx');
var React = require('react');
var Q = require('q');
var model = require('../model');

var getById = function(by) {
  var by_id;
  if (by == 'city') {
    by_id = 'city_id';
  } else if (by == 'state') {
    by_id = 'state_id';
  } else if (by == 'objective') {
    by_id = 'objective_id';
  } else if (by == 'journal') {
    by_id = 'journal_id';
  } else if (by == 'mission') {
    by_id = 'mission_id';
  } else if (by == 'author') {
    by_id = 'author';
  }
  return by_id;
};

exports.index = function(req, res) {
  var markup = React.renderComponentToString(App({
    page: 'ListPage',
    title: 'List - Cities'
  }));
  res.send('<!DOCTYPE html>' + markup);
};

exports.list = function(req, res) {
  var title = "List - " + req.params.by.charAt(0).toUpperCase() + req.params.by.slice(1);
  var markup = React.renderComponentToString(App({
    page: 'ListPage',
    title: title,
    params: req.params,
    user: req.user
  }));
  res.send('<!DOCTYPE html>' + markup);
};

exports.login = function(req, res) {
  var markup = React.renderComponentToString(App({
    page: 'LoginPage',
    title: 'Login',
    params: req.params,
    user: req.user,
    messages: req.flash('error')
  }));
  res.send('<!DOCTYPE html>' + markup);
};

exports.signup = function(req, res) {
  var markup = React.renderComponentToString(App({
    page: 'SignupPage',
    title: 'Signup',
    params: req.params,
    user: req.user,
    messages: req.flash('error')
  }));
  res.send('<!DOCTYPE html>' + markup);
};

exports.account = function(req, res) {

};

exports.location = function(req, res) {
  var by_id = getById(req.params.by);
  Q.all([
    Q.ninvoke(model, 'getNameById', req.params.by, by_id, req.params.id),
  ])
  .spread(function(location) {
    var title = req.params.by + " Of " + location.name;
    title = title.charAt(0).toUpperCase() + title.slice(1);
    var markup = React.renderComponentToString(App({
      page: 'LocationPage',
      user: req.user,
      location: location,
      params: req.params,
      title: title
    }));
    res.send('<!DOCTYPE html>' + markup);
  })
  .fail(function (err) {
    return next(err);
  });

};

exports.objective = function(req, res) {
  Q.all([
    Q.ninvoke(model, 'getObjectiveById', 'objective_id', req.params.id),
  ])
  .spread(function(objective) {
    var title = objective[0].attributes.objective;
    title = title.charAt(0).toUpperCase() + title.slice(1);
    var markup = React.renderComponentToString(App({
      page: 'ObjectivePage',
      user: req.user,
      objective: objective[0].attributes,
      params: req.params,
      title: title
    }));
    res.send('<!DOCTYPE html>' + markup);
  })
  .fail(function (err) {
    return next(err);
  });
};

exports.journal = function(req, res) {
  Q.all([
    Q.ninvoke(model, 'getJournalById', 'journal_id', req.params.id),
  ])
  .spread(function(journal) {
    var title = journal[0].attributes.journal;
    title = title.charAt(0).toUpperCase() + title.slice(1);
    var markup = React.renderComponentToString(App({
      page: 'JournalPage',
      user: req.user,
      journal: journal[0].attributes,
      params: req.params,
      title: title
    }));
    res.send('<!DOCTYPE html>' + markup);
  })
  .fail(function (err) {
    return next(err);
  });
};

exports.author = function(req, res) {
  Q.all([
    Q.ninvoke(model, 'getAuthorByUsername', req.params.username),
  ])
  .spread(function(author) {
    var title = author[0].attributes.username;
    title = title.charAt(0).toUpperCase() + title.slice(1);
    res.render('author', {
      user: req.user,
      author: author[0].attributes.username,
      title: title
    });
  })
  .fail(function (err) {
    return next(err);
  });
};

exports.mission = function(req, res) {
  Q.all([
    Q.ninvoke(model, 'getMissionById', 'mission_id', req.params.id),
  ])
  .spread(function(mission) {
    var title = mission[0].attributes.mission;
    title = title.charAt(0).toUpperCase() + title.slice(1);
    res.render('mission', {
      user: req.user,
      mission: mission[0].attributes.mission,
      id: req.params.id,
      by: 'mission',
      title: title
    });
  })
  .fail(function (err) {
    return next(err);
  });
};

exports.getObjectiveById = function(req, res) {
  var by_id = getById(req.params.by);
  Q.all([
    Q.ninvoke(model, 'getObjectiveById', by_id, req.params.id),
  ])
  .spread(function(objectives) {
    res.json(objectives);
  })
  .fail(function (err) {
    return next(err);
  });
};

exports.getJournalById = function(req, res) {
  var by_id = getById(req.params.by);
  Q.all([
    Q.ninvoke(model, 'getJournalById', by_id, req.params.id),
  ])
  .spread(function(journals) {
    res.json(journals);
  })
  .fail(function (err) {
    return next(err);
  });
};

exports.getMissionById = function(req, res) {
  var by_id = getById(req.params.by);
  Q.all([
    Q.ninvoke(model, 'getMissionById', by_id, req.params.id),
  ])
  .spread(function(mission) {
    res.json(mission);
  })
  .fail(function (err) {
    return next(err);
  });
};

exports.getMissionObjectivesById = function(req, res) {
  var by_id = getById(req.params.by);
  Q.all([
    Q.ninvoke(model, 'getMissionObjectivesById', by_id, req.params.id),
  ])
  .spread(function(mission) {
    res.json(mission);
  })
  .fail(function (err) {
    return next(err);
  });
};

exports.getMissionJournalsById = function(req, res) {
  var by_id = getById(req.params.by);
  Q.all([
    Q.ninvoke(model, 'getMissionJournalsById', by_id, req.params.id),
  ])
  .spread(function(mission) {
    res.json(mission);
  })
  .fail(function (err) {
    return next(err);
  });
};

exports.getAuthorByUsername = function(req, res) {
  Q.all([
    Q.ninvoke(model, 'getAuthorByUsername', req.params.username),
  ])
  .spread(function(author) {
    res.json(author);
  })
  .fail(function (err) {
    return next(err);
  });
};

exports.getList = function(req, res) {
  var by_id = getById(req.params.by);
  Q.all([
    Q.ninvoke(model, 'getList', req.params.by, by_id),
  ])
  .spread(function(list) {
    res.json(list);
  })
  .fail(function (err) {
    return next(err);
  });
};

exports.getNameById = function(req, res) {
  var by_id = getById(req.params.by);
  Q.all([
    Q.ninvoke(model, 'getNameById', req.params.by, by_id, req.params.id),
  ])
  .spread(function(name) {
    res.json(name);
  })
  .fail(function (err) {
    return next(err);
  });
};
