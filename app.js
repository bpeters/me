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

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  model.getUserById(id, function (err, user) {
    done(err, user);
  });
});

var hashedPassword = passwordHash.generate('password123');
console.log(hashedPassword);

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    console.log(username);
    console.log(password);
    process.nextTick(function () {
      model.getUserByEmail(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          console.log('Invalid email: ' + username);
          return done(null, false, { message: 'Invalid email: ' + username });
        }
        if (!passwordHash.verify(password, user.password)) {
          console.log('Invalid password');
          return done(null, false, { message: 'Invalid password' });
        }
        return done(null, user);
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

//authentication routes
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

//public routes
app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/list/:by', routes.list);
app.get('/location/:by/:id', routes.location);
app.get('/objective/:id', routes.objective);
app.get('/journal/:id', routes.journal);
app.get('/author/:id', routes.author);
app.get('/mission/:id', routes.mission);

//private route
app.get('/account', ensureAuthenticated, routes.account);

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

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
