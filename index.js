const express = require('express');
const app = express();
const passportConfig = require('./passport-config');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const errorHandler = require('./error/error-handler');

// import routes
const login = require('./routes/login');
const loginFacebook = require('./routes/login-facebook');
const register = require('./routes/register');
const logout = require('./routes/logout');
const landingPage = require('./routes/landing-page');
const verifyLogin = require('./routes/verify-login');
// import routes end

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true});
passportConfig(app);

landingPage(app, '/');
login(app, '/api/login');
verifyLogin(app, '/api/verify-login');
loginFacebook.loginFacebook(app, '/api/login-facebook');
loginFacebook.loginFacebookCallback(app, '/api/login-facebook-callback');
register(app, '/api/register');
logout(app, '/api/logout');

app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port);
