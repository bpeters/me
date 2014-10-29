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
    by_id = 'author_id';
  }
  return by_id;
};

exports.index = function(req, res) {
  res.redirect('/list/city');
};

exports.login = function(req, res) {
  res.render('login', {
    user: req.user,
    messages: req.flash('error'),
    title: 'login'
  });
};

exports.account = function(req, res) {

};

exports.list = function(req, res) {
  var title = req.params.by + " List";
  title = title.charAt(0).toUpperCase() + title.slice(1);
  res.render('list', {
    user: req.user,
    by: req.params.by,
    title: title
  });
};

exports.location = function(req, res) {
  var by_id = getById(req.params.by);
  Q.all([
    Q.ninvoke(model, 'getNameById', req.params.by, by_id, req.params.id),
  ])
  .spread(function(name) {
    var title = req.params.by + " Of " + name.name;
    title = title.charAt(0).toUpperCase() + title.slice(1);
    res.render('location', {
      city: name.city,
      city_id: name.city_id,
      state: name.state,
      state_id: name.state_id,
      id: req.params.id,
      by: req.params.by,
      title: title
    });
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
    res.render('objective', {
      city: objective[0].attributes.city,
      city_id: objective[0].attributes.city_id,
      state: objective[0].attributes.state,
      state_id: objective[0].attributes.state_id,
      objective: objective[0].attributes.objective,
      id: req.params.id,
      by: 'objective',
      title: title
    });
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
    res.render('journal', {
      city: journal[0].attributes.city,
      city_id: journal[0].attributes.city_id,
      state: journal[0].attributes.state,
      state_id: journal[0].attributes.state_id,
      objective: journal[0].attributes.objective,
      objective_id: journal[0].attributes.objective_id,
      journal: journal[0].attributes.journal,
      journal_entry: journal[0].attributes.journal_entry,
      author: journal[0].attributes.author,
      author_id: journal[0].attributes.author_id,
      id: req.params.id,
      by: 'journal',
      title: title
    });
  })
  .fail(function (err) {
    return next(err);
  });
};

exports.author = function(req, res) {
  Q.all([
    Q.ninvoke(model, 'getAuthorById', req.params.id),
  ])
  .spread(function(author) {
    var title = author[0].attributes.user;
    title = title.charAt(0).toUpperCase() + title.slice(1);
    res.render('author', {
      author: author[0].attributes.user,
      id: req.params.id,
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

exports.getAuthorById = function(req, res) {
  Q.all([
    Q.ninvoke(model, 'getAuthorById', req.params.id),
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
