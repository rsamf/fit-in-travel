const express = require('express');
//middleware
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');
const methodOverride = require('method-override');
//session
var session = require('express-session');
var passport = require('passport');
//OAuth
var GoogleStrategy = require('passport-google-oauth2').Strategy;
//DB
const mongoose = require('mongoose');
const dbURL = 'mongodb://samf:thebestpassword@ds059471.mlab.com:59471/fit-in-travel';
//routes
const routes = require('./routes/index');
const users = require('./routes/users');
const places = require('./routes/places');
const auth = require('./routes/auth');
const map = require('./routes/map');
const icons = require('./routes/icons');

const app = express();

mongoose.connect(dbURL);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({
    dest : './uploads',
    limits : {
        files : 1
    },
    onFileUploadStart : function (file) {
        console.log(file.fieldname + ' is starting ...');
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path);
    }
}).single('img'));

//session
passport.serializeUser(function(user, done){
    console.log("OO SERIALIZING USER " + typeof(user));
    done(null, user);
});
passport.deserializeUser(function(obj, done){
    console.log("XX DESERIALIZING USER " + typeof(obj));
    done(null, obj);
});
///OAuth
passport.use(new GoogleStrategy({
        clientID : "101781602185-amq1g5btc1d6p5qqbv5l51jnqkrg4afm.apps.googleusercontent.com",
        clientSecret : "KhbEM3y_zPs2A-uYDLSML3V4",
        callbackURL : "http://ec2-52-26-92-19.us-west-2.compute.amazonaws.com/auth/google/callback",
        passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done){
        process.nextTick(function(){
            var globals = require('./globals');
            var User = require('./models/user');
            User.findOne({
                "google.id" : profile._json.id
            }, function(err, user) {
                globals.onError(null, err);
                if(!user) {
                    User.create({
                        google : profile._json
                    }, function(err, user){
                        globals.onError(null, err);
                        return done(null, user);
                    });
                } else {
                    return done(null, user);
                }
            });
        });
    }
));
app.use(session({
    secret: 'secret123',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//routes
app.use('/', routes);
app.use('/auth', auth);
app.use('/users', users);
app.use('/places', places);
app.use('/map', map);
app.use('/icons', icons);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
