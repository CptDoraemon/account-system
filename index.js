const express = require('express');
const app = express();
const passport = require('passport');
const passportConfig = require('./passport-config');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

(async() => {
  try {
    await mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true});
    passportConfig(app);

    app.post('/api/login',
      passport.authenticate('local', {
        successRedirect: '/api/auth-succeeded',
        failureRedirect: '/api/auth-failed'
      }));

    app.get('/api/auth-succeeded', (req, res) => {
      res.json({
        message: 'ok'
      })
    });

    app.get('/api/auth-failed', (req, res) => {
      res.status(401).json({
        message: 'failed'
      })
    });

    app.get('/login', (req, res) => {
      res.send('login')
    });

    app.get('/', (req, res) => {
      const user = req.user;
      if (user) {
        res.send(`Welcome, ${user.username}`)
      } else {
        res.send('Welcome, please login')
      }
    });

    app.post('/api/register', async (req, res) => {
      try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const user = new User({
          username,
          email,
          password
        });
        await user.save();

        res.json({
          message: 'ok'
        })
      } catch (e) {
        console.log(e)
      }
    });

    app.get('/api/logout', (req, res) => {
      req.logout();
      res.json({
        message: 'ok'
      })
    });

  } catch (e) {
    console.log(e)
  }
})();

const port = process.env.PORT || 5000;
app.listen(port);
