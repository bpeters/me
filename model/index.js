var _      = require('lodash');
var Parse = require('parse').Parse;
Parse.initialize("AJqqFg9xC3sJPNqtsVXfrciFru214GQaAOvtu2Rk", "WIX18adoCiZ8at8fGfswLndYg9pudHw8cCfvFTIY");

var Objective = Parse.Object.extend("Objective");

exports.getObjective = function (callback) {
  var query = new Parse.Query(Objective);
  query.find()
  .then(function(results) {
    console.log("Successfully retrieved " + results.length + " objectives.");
    return callback(null, results);
  }, function(error) {
    console.log("Error: " + error.code + " " + error.message);
  });
};


exports.addObjective = function (name, callback) {
  console.log(name);
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

