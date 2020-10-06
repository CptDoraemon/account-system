const User = require('../models/user');

const register = (app, route) => {
  app.post(route, async (req, res, next) => {
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
      next(e)
    }
  });
};

module.exports = register;
