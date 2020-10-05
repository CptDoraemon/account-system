const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

(async() => {
  try {
    await mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true});
  } catch (e) {
    console.log(e)
  }
})();

app.use(session({ secret: process.env.SESSION_SECRECT }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    return done(null, {user: 'user'});
  }
));

passport.serializeUser(function(user, done) {
  done(null, '123');
});

passport.deserializeUser(function(id, done) {
  done(null, {
    user: 'user'
  })
});

app.post('/login', passport.authenticate('local', { successRedirect: '/',
  failureRedirect: '/login' }));

app.get('/login', (req, res) => {
  res.send('login')
});

app.get('/',
  passport.authenticate('local'),
  (req, res) => {
  console.log(req.user);
  res.send('ok')
});

app.post('/api/register', async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const _password = req.body.password;
    const hash = await bcrypt.hash(_password, saltRounds);

    const user = new User({
      username,
      email,
      password: hash
    });
    await user.save();

    res.json({
      message: 'ok'
    })
  } catch (e) {
    console.log(e)
  }
});

const port = process.env.PORT || 5000;
app.listen(port);
