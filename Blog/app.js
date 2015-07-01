var express = require('express')
    , passport = require('passport')
    , util = require('util')
    , LocalStrategy = require('passport-local').Strategy;
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var db = require('monk')('localhost:27017/nodetest1');

//var flash    = require('connect-flash');


app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

    next();
});


function findById(id, fn) {
    var users = [];
    var index = -1;
    var found = false;
    var collection = db.get('usercollection');
    collection.find({}, {}, function (e, docs) {
        users = docs;
        for (var i = 0; users.length; i++) {
            if (users[i]._id == id) {
                index = i;
                found = true;
                break;
            }

        }
        if (found == true) {
            fn(null, users[index]);
        } else {
            fn(new Error('User ' + id + ' does not exist'));
        }

    });

}

function findByUsername(username, fn) {
    var users = [];
    var collection = db.get('usercollection');
    collection.find({}, {}, function (e, docs) {
        users = docs;
        for (var i = 0, len = users.length; i < len; i++) {
            var user = users[i];
            if (user.username === username) {
                return fn(null, user);
            }
        }
        return fn(null, null);
    });
}


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

// configure Express
app.use(cookieParser());
//app.use(express.methodOverride());
app.use(session({

    secret: 'keyboard cat'
    //resave: true,
    //saveUninitialized: true,
    //cookie : { secure : false, maxAge : (40 * 60 * 60 * 1000)}, // 4 hours
}));

app.use(passport.initialize());
app.use(passport.session());


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function (user, done) {
    console.log("ser", user);
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    console.log(id, "id");
    findById(id, function (err, user) {
        done(err, user);
    });
});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
    function (username, password, done) {
        // Find the user by username.  If there is no user with the given
        // username, or the password is not correct, set the user to `false` to
        // indicate failure and set a flash message.  Otherwise, return the
        // authenticated `user`.
        findByUsername(username, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'Unknown user ' + username});
            }
            if (user.password != password) {
                return done(null, false, {message: 'Invalid password'});
            }
            return done(null, user);
        });
    }
));


// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
//app.use(flash());
app.use(express.static(__dirname + '/public'));


// Make our db accessible to our router
app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.post("/register", function (req, res) {
    console.log(req.body);

// Set our collection
    var collection = db.get('usercollection');


// Submit to the DB
    collection.insert(req.body, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.sendStatus(200);
        }

    });
});


app.get('/account', ensureAuthenticated, function (req, res) {
    res.writeHead( {
        'Location': 'your/404/path.html'
        //add other headers here...
    });
    response.end();
});


app.get('/login', function (req, res) {
    res.send("login karrrlo!")
});

// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
app.post('/login',
    passport.authenticate('local', {failureRedirect: '/loginFailed'}),
    function (req, res) {
        console.log("success", req.user);
        console.log("s2", req.session);

        res.redirect('/account');
    });

// POST /login
//   This is an alternative implementation that uses a custom callback to
//   acheive the same functionality.
/*
 app.post('/login', function(req, res, next) {
 passport.authenticate('local', function(err, user, info) {
 if (err) { return next(err) }
 if (!user) {
 req.flash('error', info.message);
 return res.redirect('/login')
 }
 req.logIn(user, function(err) {
 if (err) { return next(err); }
 return res.redirect('/users/' + user.username);
 });
 })(req, res, next);
 });
 */

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.listen(3030);


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    console.log("req.user", req.user, req.session);
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}