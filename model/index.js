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
var UserProgress = Parse.Object.extend("UserProgress");
var UserStateProgress = Parse.Object.extend("UserStateProgress");
var UserCityProgress = Parse.Object.extend("UserCityProgress");
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

exports.getUserProgressById = function (username, callback) {
  var query = new Parse.Query(UserProgress);
  query.equalTo('username', username);
  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results[0].get("username")  + ".");
      var complete = results[0].get('objective_complete_cnt');
      var total = results[0].get('objective_total_cnt');
      var progress = {
        precentage: Math.round(complete / total * 100),
        complete: complete,
        total: total
      };
      return callback(null, progress);
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
      return callback(error, null);
    }
  });
};

exports.getUserStateProgressById = function (username, callback) {
  var query = new Parse.Query(UserStateProgress);
  query.equalTo('username', username);
  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length  + " states.");
      return callback(null, results);
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
      return callback(error, null);
    }
  });
};

exports.getUserCityProgressById = function (username, callback) {
  var query = new Parse.Query(UserCityProgress);
  query.equalTo('username', username);
  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length  + " cities.");
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

exports.updateObjectiveCompleteCount = function (id, callback) {
  var query = new Parse.Query(Objective);
  query.equalTo('objective_id', parseInt(id,0));
  query.first({
    success: function(objective) {
      console.log("Successfully retrieved " + objective.get('objective') + ".");
      if (objective.get('objective_complete_cnt')) {
        objective.set("objective_complete_cnt",  objective.get('objective_complete_cnt') + 1);
      } else {
        objective.set("objective_complete_cnt",  1);
      }
      objective.save();
      return callback(null, objective.attributes);
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
      return callback(error, null);
    }
  });
};

exports.updateUserProgress = function (username, callback) {
  var query = new Parse.Query(UserProgress);
  query.equalTo('username', username);
  query.first({
    success: function(user) {
      console.log("Successfully retrieved " + user.get('username') + ".");
      user.set("objective_complete_cnt",  user.get('objective_complete_cnt') + 1);
      user.save();
      return callback(null, user.attributes);
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
      return callback(error, null);
    }
  });
};

exports.AddObjectiveToUser = function (objective, username, callback) {
  var userObjective = new UserObjectives();
  userObjective.set("username", username);
  userObjective.set("objective_id", objective.objective_id);
  userObjective.set("objective", objective.objective);
  userObjective.set("state_id", objective.state_id);
  userObjective.set("state", objective.state);
  userObjective.set("city_id", objective.city_id);
  userObjective.set("city", objective.city);

  userObjective.save(null,{
    success:function(userObjective) { 
      return callback(null, userObjective.attributes);
    },
    error:function(error) {
      console.log("Error: " + error.code + " " + error.message);
      return callback(error, null);
    }
  });
};

exports.updateUserStateProgress = function (objective, username, callback) {
  var query = new Parse.Query(UserStateProgress);
  query.equalTo('username', username);
  query.equalTo('state_id', parseInt(objective.state_id,0));
  query.first({
    success: function(user) {
      if (user) {
        console.log("Successfully retrieved " + user.get('username') + ".");
        user.set("objective_complete_cnt",  user.get('objective_complete_cnt') + 1);
        user.save();
        return callback(null, user.attributes);
      } else {
        var userStateProgress = new UserStateProgress();
        userStateProgress.set("username", username);
        userStateProgress.set("state_id", objective.state_id);
        userStateProgress.set("state", objective.state);
        userStateProgress.set("objective_complete_cnt", 1);
        userStateProgress.save(null,{
          success:function(userObjective) { 
            return callback(null, userStateProgress.attributes);
          },
          error:function(error) {
            console.log("Error: " + error.code + " " + error.message);
            return callback(error, null);
          }
        });
      }
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
      return callback(error, null);
    }
  });
};

exports.updateUserCityProgress = function (objective, username, callback) {
  var query = new Parse.Query(UserCityProgress);
  query.equalTo('username', username);
  query.equalTo('city_id', parseInt(objective.city_id,0));
  query.first({
    success: function(user) {
      if (user) {
        console.log("Successfully retrieved " + user.get('username') + ".");
        user.set("objective_complete_cnt",  user.get('objective_complete_cnt') + 1);
        user.save();
        return callback(null, user.attributes);
      } else {
        var userCityProgress = new UserCityProgress();
        userCityProgress.set("username", username);
        userCityProgress.set("city_id", objective.city_id);
        userCityProgress.set("city", objective.city);
        userCityProgress.set("objective_complete_cnt", 1);
        userCityProgress.save(null,{
          success:function(userObjective) { 
            return callback(null, userCityProgress.attributes);
          },
          error:function(error) {
            console.log("Error: " + error.code + " " + error.message);
            return callback(error, null);
          }
        });
      }
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
      return callback(error, null);
    }
  });
};
