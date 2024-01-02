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
        deviceTypes: data.deviceTypes,
        deviceManufacturers: data.deviceManufacturers,
      },
    });
  });
  addDevSet = tryCatchDecorator(async (req, res) => {
    const { type, manufacturer } = req.body;
    const trimedType =
      typeof type === 'string' ? firstLetterUpperCase(type.trim()) : undefined; // Роблю type з великої літери та без пробілів.
    const trimedManufacturer =
      typeof manufacturer === 'string'
        ? firstLetterUpperCase(manufacturer.trim())
        : undefined; // роблю manufacturer з великої літери та без пробілів
    const { _id: id } = req.user;

    if (!(trimedType || trimedManufacturer)) throw httpError(400); // перевіряю, чи передали type або manufacturer, якщо ні - викидаю помилку

    const user = await DevSetModel.findOne({ owner: id }); // шукаю користувача по id
    // якщо юзера нема, то створюєм юзера + записуєм йому данні, які передалі в body, якщо юзер є, то просто оновлюємо необхідні данні.
    if (!user) {
      const newUser = new DevSetModel({
        owner: id,
      });
      if (trimedType) {
        newUser.deviceTypes = [{ deviceType: trimedType }];
      }
      if (trimedManufacturer) {
        newUser.deviceManufacturers = [
          {
            manufacturer: trimedManufacturer,
          },
        ];
      }

      await newUser.save();

      res.status(201);
      res.json({
        code: 201,
        message: 'User settings created',
        data: {
          deviceTypes: newUser.deviceTypes,
          deviceManufacturers: newUser.deviceManufacturers,
        },
      });
      return;
    } else {
      const isDevType = user.deviceTypes.some(
        ({ deviceType }) => deviceType === trimedType
      );
      const isManufacturer = user.deviceManufacturers.some(
        ({ manufacturer }) => manufacturer === trimedManufacturer
      );

      if (trimedType && !isDevType) {
        console.log('added deviceType');
        user.deviceTypes = [...user.deviceTypes, { deviceType: trimedType }];
      }
      if (trimedManufacturer && !isManufacturer) {
        console.log('added deviceManufacturer');
        user.deviceManufacturers = [
          ...user.deviceManufacturers,
          { manufacturer: trimedManufacturer },
        ];
      }
      await user.save();
      res.status(201);
      res.json({
        code: 201,
        message: `user settings have been updated`,
        data: {
          deviceTypes: user.deviceTypes,
          deviceManufacturers: user.deviceManufacturers,
        },
      });
      return;
    }
  });
}

module.exports = new UserController();
