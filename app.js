var express = require('express');
var app = express();
var path = require('path');
var swig  = require('swig');
var _      = require('lodash');
var bodyParser = require('body-parser');
var routes = require('./routes');
var model = require('./model');
var passport = require('passport');
var flash = require('connect-flash');
var passwordHash = require('password-hash');
var LocalStrategy = require('passport-local').Strategy;
var Q = require('q');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  model.getUserById(id, function (err, user) {
    done(err, user);
  });
});

passport.use('local-login', new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    process.nextTick(function () {
      model.getUserByEmail(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Invalid email: ' + username });
        }
        model.logIn(user.username, password, function(err, user) {
          if (err) { return done(err); }
          return done(null, user);
        });
      });
    });
  }
));

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  },
  function(req, username, password, done) {
    if (req.body.username.indexOf(' ') >= 0) {
      return done(null, false, { message: "Username '" + req.body.username + "' contains a space, please remove or replace with an underscore." });
    }
    process.nextTick(function () {
      Q.all([
        Q.ninvoke(model, 'getUserByEmail', username),
        Q.ninvoke(model, 'getUserByUsername', req.body.username),
      ])
      .spread(function(user1, user2) {
        if (user1 && user2) {
          return done(null, false, { message: 'Both email ' + username + ' and username ' + req.body.username + ' are already in use.' });
        } else if (user1) {
          return done(null, false, { message: username + ' is already in use.' });
        } else if (user2) {
          return done(null, false, { message: req.body.username + ' is already in use.' });
        } else {
          model.signUp(username, req.body.username, password, function(err, user) {
            if (err) { return done(null, false, { message: err.message });}
            return done(null, user);
          });
        }
      })
      .fail(function (err) {
        return done(err);
      });
    });
  }
));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
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

app.post('/login',
  passport.authenticate('local-login', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

app.post('/signup',
  passport.authenticate('local-signup', { successRedirect: '/',
                                   failureRedirect: '/signup',
                                   failureFlash: true })
);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

//public routes
app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/signup', routes.signup);
app.get('/list/:by', routes.list);
app.get('/location/:by/:id', routes.location);
app.get('/objective/:id', routes.objective);
app.get('/journal/:id', routes.journal);
app.get('/author/:username', routes.author);
app.get('/author/:username/stats', routes.author);
app.get('/author/:username/journals', routes.author);
app.get('/author/:username/missions', routes.author);
app.get('/mission/:id', routes.mission);

//private route
app.get('/account', ensureAuthenticated, routes.account);

//api routes
app.get('/api/1/getObjective/:by/:id', routes.getObjectiveById);
app.get('/api/1/getJournal/:by/:id', routes.getJournalById);
app.get('/api/1/getAuthor/:username', routes.getAuthorByUsername);
app.get('/api/1/getMission/:by/:id', routes.getMissionById);
app.get('/api/1/getMissionObjectives/:by/:id', routes.getMissionObjectivesById);
app.get('/api/1/getMissionJournals/:by/:id', routes.getMissionJournalsById);
app.get('/api/1/getList/:by', routes.getList);
app.get('/api/1/getName/:by/:id', routes.getNameById);

var port = Number(process.env.PORT || 3000);
app.listen(port, function() {
  console.log("Listening on " + port);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
