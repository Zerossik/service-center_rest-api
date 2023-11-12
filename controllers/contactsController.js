const { tryCatchDecorator } = require('../decorators');
const { httpError } = require('../helper');
const { Contacts } = require('../models');

class ContactsController {
  getAll = tryCatchDecorator(async (req, res) => {
    const { _id: owner } = req.user;

    const { page = 1, limit = 100 } = req.query;
    const skip = (page - 1) * limit;

    const data = await Contacts.find({ owner }, null, { skip, limit });

    res.status(200);
    res.json({ code: 200, data: data });
  });

  addContact = tryCatchDecorator(async (req, res) => {
    const { _id: owner } = req.user;

    const data = await Contacts.create({ ...req.body, owner });

    res.status(201);
    res.json({ code: 201, data: data });
  });

  getContactById = tryCatchDecorator(async (req, res) => {
    const { id } = req.params;

    const data = await Contacts.findById(id);
    if (!data) throw httpError(404);

    res.status(200);
    res.json({ code: 200, data: data });
  });

  deleteContact = tryCatchDecorator(async (req, res) => {
    const { id } = req.params;

    const deletedContact = await Contacts.findByIdAndDelete(id);
    if (!deletedContact) throw httpError(404, `id ${id} Not Found`);

    res.status(200);
    res.json({ code: 200, message: 'Contact deleted', data: deletedContact });
  });

  updateContact = tryCatchDecorator(async (req, res) => {
    const { id } = req.params;

    const updatedContact = await Contacts.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedContact) throw httpError(404, `id ${id} Not Found`);

    res.status(201);
    res.json({
      code: 201,
      message: 'Contact is updated',
      data: updatedContact,
    });
  });
}

module.exports = new ContactsController();
