const express = require('express');
//middleware
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');
//session
const session = require('express-session');
const passport = require('passport');
//OAuth
const GoogleStrategy = require('passport-google-oauth2').Strategy;
//DB
const mongoose = require('mongoose');
const dbURL = 'mongodb://samf:thebestpassword@ds153815.mlab.com:53815/mango-app';
//routes
const routes = require('./routes/index');
const users = require('./routes/users');
const auth = require('./routes/auth');
const map = require('./routes/map');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
app.use(session({
    secret: 'secret123',
    resave: true,
    saveUninitialized: true
}));
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
        clientID : "230827314722-1e14t2obr5ok73slgodc7k6oav86k9sp.apps.googleusercontent.com",
        clientSecret : "cQ4H-7S4KhMABixQeMGPDxog",
        callbackURL : "http://ec2-52-41-111-18.us-west-2.compute.amazonaws.com/auth/callback",
        passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done){
        process.nextTick(function(){
            var handlers = require('./globals');
            var User = require('./models/user');
            User.findOne({
                    "google.id" : profile._json.id
                }, function(err, user) {
                    handlers.onError(res,err);
                    if(!user) {
                        User.create({
                            google : profile._json
                        }, function(err, user){
                            handlers.onError(res, err);
                            return done(null, user);
                        });
                    } else {
                        return done(null, user);
                    }
                }
            );
        });
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
app.use('/map', map);

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
