var express = require('express');
var app = express();
var path = require('path');
var swig  = require('swig');
var _      = require('lodash');
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
var flash = require('connect-flash');
var routes = require('./routes');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(express.cookieParser());
app.use(express.session({ secret: 'happy days' }));
app.use(flash());
app.use(express.static(path.join(__dirname, '/public')));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache: false });

//routes
app.get('/', routes.index);
app.get('/list/:by', routes.list);
app.get('/location/:by/:id', routes.location);
app.get('/objective/:id', routes.objective);
app.get('/journal/:id', routes.journal);
app.get('/author/:id', routes.author);
app.get('/mission/:id', routes.mission);

//api routes
app.get('/api/1/getObjective/:by/:id', routes.getObjectiveById);
app.get('/api/1/getJournal/:by/:id', routes.getJournalById);
app.get('/api/1/getAuthor/:id', routes.getAuthorById);
app.get('/api/1/getMission/:by/:id', routes.getMissionById);
app.get('/api/1/getMissionObjectives/:by/:id', routes.getMissionObjectivesById);
app.get('/api/1/getMissionJournals/:by/:id', routes.getMissionJournalsById);
app.get('/api/1/getList/:by', routes.getList);
app.get('/api/1/getName/:by/:id', routes.getNameById);

var port = Number(process.env.PORT || 3000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
