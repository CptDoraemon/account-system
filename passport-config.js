const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
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
        console.log(user);

        // Incorrect username
        if (!user) {
          return done(null, false);
        }
        const isPasswordMatch = await user.comparePassword(password);
        // Incorrect password
        if (!isPasswordMatch) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        console.log(err);
        return done(err);
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
