const { tryCatchDecorator } = require('../decorators');
const { httpError } = require('../helper');
const { User } = require('../models');

class UserController {
  changeTheme = tryCatchDecorator(async (req, res) => {
    const { _id: userID } = req.user;
    const { theme } = req.body;
    if (!theme) httpError(400);

    await User.findByIdAndUpdate(userID, { theme }, { new: true });

    res.status(201);
    res.json({ code: 201, message: 'Theme changed' });
  });
}

module.exports = new UserController();
