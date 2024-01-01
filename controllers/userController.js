const { customAlphabet } = require('nanoid');
const { tryCatchDecorator } = require('../decorators');
const { httpError, firstLetterUpperCase } = require('../helper');
const { User, DevSetModel } = require('../models');

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
    const { firstName, lastName } = req.body;
    const { user } = req;
    if (!(firstName && lastName))
      throw httpError(400, 'Bad Request, firstName and lastName is required');
    const nanoid = customAlphabet('1234567890qwert', 12);
    const newMaster = {
      id: nanoid(),
      firstName: firstLetterUpperCase(firstName),
      lastName: firstLetterUpperCase(lastName),
    };

    user.masters = [...user.masters, newMaster];
    user.save();

    res.status(201);
    res.json({ code: 201, data: newMaster });
  });

  deleteMaster = tryCatchDecorator(async (req, res) => {
    const { user } = req;
    const { id } = req.body;
    if (!id) throw httpError(400, 'Bad Request, master id is required');

    const deletedMaster = user.masters.find(({ id: userID }) => userID === id);
    if (!deletedMaster)
      throw httpError(404, `master with id - ${id} Not Found`);

    user.masters = user.masters.filter(({ id: userID }) => userID !== id);
    user.save();

    res.status(200);
    res.json({ code: 200, data: deletedMaster });
  });

  addDevSet = tryCatchDecorator(async (req, res) => {
    const { type, manufacturer } = req.body;
    const trimedType = typeof type === 'string' ? type.trim() : undefined;
    const trimedManufacturer =
      typeof manufacturer === 'string' ? manufacturer.trim() : undefined;
    const { _id: id } = req.user;

    if (!(trimedType || trimedManufacturer)) throw httpError(400);

    const user = await DevSetModel.findOne({ owner: id });
    if (!user) {
      const newUser = new DevSetModel({
        owner: id,
      });
      if (trimedType) {
        newUser.deviceTypes = [firstLetterUpperCase(trimedType)];
      }
      if (trimedManufacturer) {
        newUser.deviceManufacturers = [
          firstLetterUpperCase(trimedManufacturer),
        ];
      }
      newUser.save();
      console.log('User settings created');
      res.status(201);
      res.json({
        code: 201,
        data: {
          deviceTypes: newUser.deviceTypes,
          deviceManufacturers: newUser.deviceManufacturers,
        },
      });
      return;
    }
    console.log('Конец Контроллера');
    res.status(201);
    res.json({ code: 201, message: 'OK' });
  });
}

module.exports = new UserController();
