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

//api routes
app.post('/api/1/addObjective/:name', routes.addObjective);

app.get('/api/1/getCity', routes.getCity);
app.get('/api/1/getCity/:id', routes.getCityById);
app.get('/api/1/getObjective', routes.getObjective);

var port = Number(process.env.PORT || 3000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
