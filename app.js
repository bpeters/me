var express = require('express');
var app = express();
var logfmt = require('logfmt');
var path = require('path');
var swig  = require('swig');
var _      = require('lodash');
var CONFIG = require('config');
var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google').Strategy;
var passwordHash = require('password-hash');
var flash = require('connect-flash');
var routes = require('./routes');
var model = require('./model');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(logfmt.requestLogger());
app.use(express.cookieParser());
app.use(express.session({ secret: 'happy days' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '/public')));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache: false });

//routes
app.get('/', routes.index);

var port = Number(process.env.PORT || 3000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
