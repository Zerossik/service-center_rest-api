const homePageController = (req, res) => {
  res.status(200);
  res.json({ code: 200, message: 'Welcome' });
};

module.exports = homePageController;
