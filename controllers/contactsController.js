const { tryCatchDecorator } = require('../decorators');
const { Contacts } = require('../models');

class ContactsController {
  getAll = tryCatchDecorator(async (req, res) => {
    res.status(200);
    res.json({ code: 200, message: 'OK' });
  });

  addContact = tryCatchDecorator(async (req, res) => {
    const { _id: owner } = req.user;
    const data = await Contacts.create({ ...req.body, owner });
    res.status(201);
    res.json({ code: 201, data: data });
  });
}

module.exports = new ContactsController();
