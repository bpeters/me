var Reflux = require('reflux');

var ObjectiveActions = Reflux.createActions([
   "load",
   "complete",
   "notComplete"
]);

module.exports = ObjectiveActions;
