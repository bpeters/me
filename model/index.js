var _      = require('lodash');
var Parse = require('parse').Parse;
Parse.initialize("AJqqFg9xC3sJPNqtsVXfrciFru214GQaAOvtu2Rk", "WIX18adoCiZ8at8fGfswLndYg9pudHw8cCfvFTIY");

var Objective = Parse.Object.extend("Objective");
var Journal = Parse.Object.extend("Journal");
var Mission = Parse.Object.extend("Mission");
var MissionObjectives = Parse.Object.extend("MissionObjectives");
var MissionJournals = Parse.Object.extend("MissionJournals");
var User = Parse.Object.extend("User");
var UserObjectives = Parse.Object.extend("UserObjectives");
var City = Parse.Object.extend("City");
var State = Parse.Object.extend("State");

exports.logIn = function (username, password, callback) {
  Parse.User.logIn(username.toLowerCase(), password.toString(), {
    success: function(user_object) {
      console.log(user_object.get('username') + ' logged in.');
      var user = {
        id: user_object.id,
        username: user_object.get("username"),
        email: user_object.get("email")
      };
      return callback(null, user);
    },
    error: function(user, error) {
      console.log("Error: " + error.code + " " + error.message);
      return callback(error, null);
    }
  });
};

exports.signUp = function (email, username, password, callback) {
  var user = new User();
  user.set("email", email);
  user.set("username", username.toLowerCase());
  user.set("password", password.toString());
  user.signUp(null, {
    success: function(user_object) {
      console.log(user_object.get('username') + ' signed up.');
      var user = {
        id: user_object.id,
        username: user_object.get("username"),
        email: user_object.get("email")
      };
      return callback(null, user);
    },
    error: function(user, error) {
      console.log("Error: " + error.code + " " + error.message);
      return callback(error, null);
    }
  });
};

exports.getUserById = function (id, callback) {
  var query = new Parse.Query(User);
  query.get(id, {
    success: function(user_object) {
      console.log("Successfully retrieved " + user_object.get("username")  + ".");
        var user = {
          id: user_object.id,
          username: user_object.get("username"),
          email: user_object.get("email")
        };
        return callback(null, user);
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
      return callback(error, null);
    }
  });
};

exports.getUserByUsername= function (username, callback) {
  var query = new Parse.Query(User);
  query.equalTo('username', username.toLowerCase());
  query.find({
    success: function(results) {
      if (results[0]) {
        console.log("Successfully retrieved " + results[0].get("username")  + ".");
        var user = {
          id: results[0].id,
          username: results[0].get("username"),
          email: results[0].get("email")
        };
        return callback(null, user);
      } else {
        return callback(null, null);
      }
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
      return callback(error, null);
    }
  });
};

exports.getUserByEmail = function (email, callback) {
  var query = new Parse.Query(User);
  query.equalTo('email', email);
  query.find({
    success: function(results) {
      if (results[0]) {
        console.log("Successfully retrieved " + results[0].get("username")  + ".");
        var user = {
          id: results[0].id,
          username: results[0].get("username"),
          email: results[0].get("email")
        };
        return callback(null, user);
      } else {
        return callback(null, null);
      }
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
      return callback(error, null);
    }
  });
};

exports.getObjectiveById = function (by_id, id, callback) {
  var query = new Parse.Query(Objective);
  query.equalTo(by_id, parseInt(id,0));
  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length + " objectives.");
      return callback(null, results);
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
      return callback(error, null);
    }
  });
};

exports.getJournalById = function (by_id, id, callback) {
  var query = new Parse.Query(Journal);
  if (by_id != 'author') {
    id = parseInt(id,0);
  }
  query.equalTo(by_id, id);
  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length + " journals.");
      return callback(null, results);
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
      return callback(error, null);
    }
  });
};

exports.getMissionById = function (by_id, id, callback) {
  var query = new Parse.Query(Mission);
  if (by_id != 'author') {
    id = parseInt(id,0);
  }
  query.equalTo(by_id, id);
  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length + " missions.");
      return callback(null, results);
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
      return callback(error, null);
    }
  });
};

exports.getMissionObjectivesById = function (by_id, id, callback) {
  var query = new Parse.Query(MissionObjectives);
  query.equalTo(by_id, parseInt(id,0));
  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length + " mission objectives.");
      return callback(null, results);
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
      return callback(error, null);
    }
  });
};

exports.getUserObjectivesById = function (username, callback) {
  var query = new Parse.Query(UserObjectives);
  query.equalTo('username', username);
  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length + " user objectives.");
      return callback(null, results);
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
      return callback(error, null);
    }
  });
};

exports.getMissionJournalsById = function (by_id, id, callback) {
  var query = new Parse.Query(MissionJournals);
  query.equalTo(by_id, parseInt(id,0));
  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length + " mission journals.");
      return callback(null, results);
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
      return callback(error, null);
    }
  });
};

exports.getAuthorByUsername = function (username, callback) {
  var query = new Parse.Query(User);
  query.equalTo('username', username);
  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results[0].get('username') + ".");
      return callback(null, results);
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
      return callback(error, null);
    }
  });
};

exports.getList = function (by, by_id, callback) {
  var query;
  var list = [];
  if ( by == 'city') {
    query = new Parse.Query(City);
  } else {
    query = new Parse.Query(State);
  }
  query.find({
    success: function(results) {
      for (var i = 0; i < results.length; i++) {
        var object = {
          name : results[i].get(by),
          id: results[i].get(by_id),
          objectives: results[i].get(by + '_objective_cnt'),
          journals: results[i].get(by + '_journal_cnt'),
          missions: results[i].get(by + '_mission_cnt')
        };
        list.push(object);
      }
      console.log("Successfully retrieved " + list.length + " " + by + ".");
      return callback(null, list);
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
      return callback(error, null);
    }
  });
};

exports.getNameById = function (by, by_id, id, callback) {
  var query = new Parse.Query(City);
  query.equalTo(by_id, parseInt(id,0));
  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results[0].get(by) + ".");
      var object = {
        name: results[0].get(by),
        city: results[0].get('city'),
        city_id: results[0].get('city_id'),
        state : results[0].get('state'),
        state_id : results[0].get('state_id')
      };
      return callback(null, object);
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
      return callback(error, null);
    }
  });
};
