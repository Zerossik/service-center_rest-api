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
    //Створюю Ім'я користувача без пробілів та роблю Ім'я з великої літери
    const trimedFirstName =
      typeof firstName === 'string'
        ? firstLetterUpperCase(firstName.trim())
        : undefined;
    //Створюю Прізвище користувача без пробілів та роблю Прізвище з великої літери
    const trimedLastName =
      typeof lastName === 'string'
        ? firstLetterUpperCase(lastName.trim())
        : undefined;
    const { user } = req;
    // якщо не передали Ім'я та Прізвище - викидаю помилку!
    if (!(trimedFirstName && trimedLastName))
      throw httpError(400, 'Bad Request, firstName and lastName is required');
    // Перевіряю, чи є вже майтер з таким Ім'ям та Прізвищем, якщо є - викидаю помилку 409
    const isMaster = user.masters.some(
      ({ firstName, lastName }) =>
        firstName === trimedFirstName && lastName === trimedLastName
    );
    if (isMaster) throw httpError(409);
    // Створюю об'єкт з номим майстром.
    const newMaster = {
      firstName: trimedFirstName,
      lastName: trimedLastName,
    };

    user.masters = [...user.masters, newMaster];
    await user.save(); // Зберію майстра в базу!

    res.status(201);
    res.json({ code: 201, data: newMaster });
  });

  deleteMaster = tryCatchDecorator(async (req, res) => {
    const { user } = req;
    const { id } = req.body;
    if (!id) throw httpError(400, 'Bad Request, master id is required'); // якщо не передали id - Викидаю помилку

    const deletedMaster = user.masters.find(
      ({ _id: userID }) => userID.toString() === id
    ); // Перевіряю, чи є майстр з таким id в базі, якщо немає - викидаю помилку 404

    if (!deletedMaster)
      throw httpError(404, `master with id - ${id} Not Found`);

    user.masters = user.masters.filter(
      ({ _id: userID }) => userID.toString() !== id
    ); // Видаляю майстра по id, який передали в body
    await user.save(); // зберігаю в базі

    res.status(200);
    res.json({ code: 200, data: deletedMaster });
  });
  getDevSet = tryCatchDecorator(async (req, res) => {
    const { _id: id } = req.user;
    const data = await DevSetModel.findOne({ owner: id });
    if (!data) throw httpError(404);
    res.status(200);
    res.json({
      code: 200,
      data: {
        deviceTypes: data.deviceTypes.length > 0 ? data.deviceTypes : null,
        deviceManufacturers:
          data.deviceManufacturers.length > 0 ? data.deviceManufacturers : null,
      },
    });
  });

  addDevType = tryCatchDecorator(async (req, res) => {
    const { type } = req.body;
    const trimedType =
      typeof type === 'string' ? firstLetterUpperCase(type.trim()) : undefined; // Роблю type з великої літери та без пробілів.
    const { _id: id } = req.user;

    if (!trimedType) throw httpError(400, 'Bad Request, type is required'); // перевіряю, чи передали type, якщо ні - викидаю помилку

    const user = await DevSetModel.findOne({ owner: id }); // шукаю користувача по id, якщо користувача не існує, то створюю.
    if (!user) {
      const newUser = new DevSetModel({
        owner: id,
        deviceTypes: [{ deviceType: trimedType }],
      });
      await newUser.save();
      res.status(201);
      res.json({
        code: 201,
        message: 'User settings created',
        data: newUser.deviceTypes[0],
      });
      return;
    }
    // якщо користувач існує, то я просто оновлюю дані.
    const isType = user.deviceTypes.some(
      ({ deviceType }) => deviceType === trimedType
    ); // перевіряю, чи є вже такий тип в базі чи ні.
    if (isType) throw httpError(409); // якщо є, викидаю помилку 409

    user.deviceTypes = [...user.deviceTypes, { deviceType: trimedType }];
    await user.save();

    const typeIndex = user.deviceTypes.length - 1; // отримую останій індекс в массиві, щоб повернути на фронтенд останній доданий тип

    res.status(201);
    res.json({
      code: 201,
      message: `user settings have been updated`,
      data: user.deviceTypes[typeIndex],
    });
  });
  addDevManufacturer = tryCatchDecorator(async (req, res) => {
    const { manufacturer } = req.body;
    const trimedManufacturer =
      typeof manufacturer === 'string'
        ? firstLetterUpperCase(manufacturer.trim())
        : undefined; // роблю manufacturer з великої літери та без пробілів
    const { _id: id } = req.user;

    if (!trimedManufacturer)
      throw httpError(400, 'Bad Request, manufacturer is required'); // перевіряю чи передали manufacturer, якщо ні - викидаю помилку 400

    const user = await DevSetModel.findOne({ owner: id }); // шукаю користувача по id, якщо користувача не існує, то створюю.
    if (!user) {
      const newUser = new DevSetModel({
        owner: id,
        deviceManufacturers: [{ manufacturer: trimedManufacturer }],
      });
      await newUser.save();
      res.status(201);
      res.json({
        code: 201,
        message: 'User settings created',
        data: newUser.deviceManufacturers[0],
      });
      return;
    }
    const isManufacturer = user.deviceManufacturers.some(
      ({ manufacturer }) => manufacturer === trimedManufacturer
    ); // перевіряю, чи є вже такий manufacturer в базі

    if (isManufacturer) throw httpError(409); // якщо є - викидаю помилку
    //оновлюю та зберігаю manufacturer в базу
    user.deviceManufacturers = [
      ...user.deviceManufacturers,
      { manufacturer: trimedManufacturer },
    ];
    await user.save();

    const manufacturerIndex = user.deviceManufacturers.length - 1;
    res.status(201);
    res.json({
      code: 201,
      message: `user settings have been updated`,
      data: user.deviceManufacturers[manufacturerIndex],
    });
  });
}

module.exports = new UserController();
