const passport = require('passport');

const loginFacebook = (app, route) => {
  app.get(route, passport.authenticate('facebook', { scope: 'email' }));
};

const loginFacebookCallback = (app, route) => {
  app.get(route, authenticate);
};

function authenticate(req, res, next) {
  passport.authenticate('facebook', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      return res.status(401).json({
        message: info.message || 'error'
      })
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json({
        message: 'ok'
      })
    });
  })(req, res, next);
}

module.exports = {
  loginFacebook,
  loginFacebookCallback
};
