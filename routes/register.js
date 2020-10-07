const User = require('../models/user');

const register = (app, route) => {
  app.post(route, async (req, res, next) => {
    try {
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;

      const usernameTaken = await User.findOne({username}).exec();
      if (usernameTaken) {
        return res.status(401).json({
          message: 'username is taken'
        })
      }

      const emailTaken = await User.findOne({email}).exec();
      if (emailTaken) {
        return res.status(401).json({
          message: 'email is registered'
        })
      }

      const user = new User({
        username,
        email,
        password
      });
      await user.save();

      return res.redirect(307, '/api/login')
    } catch (e) {
      next(e)
    }
  });
};

module.exports = register;
