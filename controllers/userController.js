const { tryCatchDecorator } = require('../decorators');
const { httpError } = require('../helper');
const { User } = require('../models');

class UserController {
  changeTheme = tryCatchDecorator(async (req, res) => {
    const { _id: userID } = req.user;
    const { theme } = req.body;
    if (!theme) httpError(400);

    const data = await User.findByIdAndUpdate(userID, { theme }, { new: true });

    res.status(201);
    res.json({ code: 201, data: { theme: data.theme } });
  });

  addMaster = tryCatchDecorator(async (req, res) => {
    const { master } = req.body;
    const { user } = req;
    if (!master) throw httpError(400, 'Bad Request, master is required');

    user.masters = [...user.masters, master];
    user.save();

    res.status(201);
    res.json({ code: 201, message: `master ${master} was added` });
  });

  deleteMaster = tryCatchDecorator(async (req, res) => {
    const { user } = req;
    const { master } = req.body;
    if (!master) throw httpError(400, 'Bad Request, master is required');
    if (!user.masters.includes(master))
      throw httpError(404, `master ${master} Not Found`);

    user.masters = user.masters.filter(el => el !== master);
    user.save();

    res.status(200);
    res.json({ code: 200, message: `master ${master} was deleted` });
  });
}

module.exports = new UserController();
