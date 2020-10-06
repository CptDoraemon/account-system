const express = require('express');
const app = express();
const passportConfig = require('./passport-config');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config();
const errorHandler = require('./error/error-handler');

// import routes
const login = require('./routes/login');
const loginFacebook = require('./routes/login-facebook');
const register = require('./routes/register');
const logout = require('./routes/logout');
const landingPage = require('./routes/landing-page');
// import routes end

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true});
passportConfig(app);

app.use(errorHandler);
landingPage(app, '/');
login(app, '/api/login');
loginFacebook.loginFacebook(app, '/api/login-facebook');
loginFacebook.loginFacebookCallback(app, '/api/login-facebook-callback');
register(app, '/api/register');
logout(app, '/api/logout');

const port = process.env.PORT || 5000;
app.listen(port);
