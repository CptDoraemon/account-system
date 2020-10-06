const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const User = require('./models/user');

const passportConfig = (app) => {
  app.use(session({
    secret: process.env.SESSION_SECRECT,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'session'
    })
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async function(username, password, done) {
      try {
        const user = await User.findOne({ username: username });

        // Incorrect username
        if (!user) {
          return done(null, false, {message: 'Incorrect username'});
        }

        const isPasswordMatch = await user.comparePassword(password);
        // Incorrect password
        if (!isPasswordMatch) {
          return done(null, false, {message: 'Incorrect password'});
        }

        // auth succeeded
        return done(null, user);

      } catch (err) {
        console.log(err);
        return done(err);
      }
    }
  ));

  passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/api/login-facebook-callback',
      profileFields: ['id', 'emails', 'name']
    },
    async function(accessToken, refreshToken, profile, done) {
      try {
        const user = await User.handleSSOSignIn('facebook', profile.id, profile.emails[0].value, `${profile.name.givenName} ${profile.name.familyName}`);
        done(null, user);
      } catch (e) {
        done(e, false);
      }
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};

module.exports = passportConfig;
