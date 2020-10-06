const passport = require('passport');

const login = (app, route) => {
  app.post(route, authenticate);
};

function authenticate(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
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

module.exports = login;
