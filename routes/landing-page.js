const landingPage = (app, route) => {
  app.get(route, (req, res) => {
    const user = req.user;
    if (user) {
      res.send(`Welcome, ${user.username}`)
    } else {
      res.send('Welcome, please login')
    }
  });
};

module.exports = landingPage;
