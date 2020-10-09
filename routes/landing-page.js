const path = require('path');

const landingPage = (app, route) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(process.cwd(), '/client/build/index.html'));
  });
};

module.exports = landingPage;
