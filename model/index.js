var _      = require('lodash');
var Parse = require('parse').Parse;
Parse.initialize("AJqqFg9xC3sJPNqtsVXfrciFru214GQaAOvtu2Rk", "WIX18adoCiZ8at8fGfswLndYg9pudHw8cCfvFTIY");

var Objective = Parse.Object.extend("Objective");
var Journal = Parse.Object.extend("Journal");
var Mission = Parse.Object.extend("Mission");
var MissionObjectives = Parse.Object.extend("MissionObjectives");
var User = Parse.Object.extend("User");
var City = Parse.Object.extend("City");
var State = Parse.Object.extend("State");

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
    }
  });
};

exports.getJournalById = function (by_id, id, callback) {
  var query = new Parse.Query(Journal);
  query.equalTo(by_id, parseInt(id,0));
  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length + " journals.");
      return callback(null, results);
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
    }
  });
};

exports.getMissionById = function (by_id, id, callback) {
  var query = new Parse.Query(Mission);
  query.equalTo(by_id, parseInt(id,0));
  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length + " missions.");
      return callback(null, results);
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
    }
  });
};

exports.getMissionObjectives = function (id, callback) {
  var query = new Parse.Query(MissionObjectives);
  query.equalTo('mission_id', parseInt(id,0));
  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length + " mission objectives.");
      return callback(null, results);
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
    }
  });
};

exports.getAuthorById = function (id, callback) {
  var query = new Parse.Query(User);
  query.equalTo('user_id', parseInt(id,0));
  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results[0].get('user') + ".");
      return callback(null, results);
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
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
      }
      return callback(null, object);
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
    }
  });
};

exports.addObjective = function (name, callback) {
  var objective = new Objective();
  objective.set("name", name);
  objective.save(null, {
    success: function(objective) {
      // Execute any logic that should take place after the object is saved.
      console.log('New object created with objectId: ' + objective.id);
      return callback(null, objective.id);
    },
    error: function(objective, error) {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      console.log('Failed to create new object, with error code: ' + error.message);
    }
  });
};

