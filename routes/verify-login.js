const verifyLogin = (app, route) => {
  app.get(route, (req, res) => {
    if (req.isAuthenticated()) {
      res.json({
        username: req.user.username
      })
    } else {
      res.status(401).json({
        message: 'not logged in'
      })
    }
  });
};

module.exports = verifyLogin;
