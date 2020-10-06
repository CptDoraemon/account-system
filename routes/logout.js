const logout = (app, route) => {
  app.get(route, (req, res) => {
    req.logout();
    res.json({
      message: 'ok'
    })
  });
};

module.exports = logout;
