var pg = require('pg');
var swigql = require('swigql');
var _      = require('lodash');
var CONFIG = require('config');


var conString = process.env.DATABASE_URL;
if (conString === undefined) conString = ("postgres://" + CONFIG.db.user + ":" + CONFIG.db.pass + "@" + CONFIG.db.host + "/" + CONFIG.db.database);

console.log(conString);

function generateSwigqlPhrasebook (baseDir, queryNames) {
  var phrasebook = { };
  for (var i = 0; i < queryNames.length; i++) {
    phrasebook[queryNames[i]] = swigql.compileFile(baseDir + queryNames[i] + '.swigql', 'utf-8');
  }
  return phrasebook;
}

function swigqlQuery (client, templ, context) {
  var result = templ.render(context);
  //console.log("query: " + result[0] + " bind: " + result[1], { query: result[0], bind: result[1] });
  var args = result.concat(_.toArray(arguments).slice(3));
  var finals = {};
  var starttime = process.hrtime();
  args[2] = _.wrap(args[2], function(func, error, result) {
    if (error) {
      finals.error = error;
    }
    if (result && result.rowCount) {
      finals.row_count = result.rowCount;
    }
    var startCb = process.hrtime();
    if (_.isFunction(func)) {
      func.apply(undefined, _.toArray(arguments).slice(1));
    }
  });
  var query = client.query.apply(client, args);
  return query;
}

var querypg = function (phrase, params, callback) {
  if (!params) {
    params = {};
  }
  pg.connect(conString, function (err, client, pg_done) {
    if (err) {
      pg_done();
      return callback(err);
    }
    swigqlQuery(client, phrasebook[phrase], params, function (err, results) {
      if (err) {
        pg_done();
        return callback(err);
      }
      pg_done();
      return callback(null, results.rows);
    });
  });
};

var phrasebook  = generateSwigqlPhrasebook(__dirname + '/queries/', [
  'test'
]);

exports.test = function (callback) {
  querypg('test', {}, function (err, rows) {
    if (err) {
      return callback(err);
    } else {
      return callback(null, rows);
    }
  });
};

