const { tryCatchDecorator } = require('../decorators');
const { httpError } = require('../helper');
const { Contacts, Archive, UserSettings } = require('../models');

class ContactsController {
  getAll = tryCatchDecorator(async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, type, filter } = req.query;
    const skip = (page - 1) * limit;

    const searchSettings = {
      owner,
    };

    if (type) searchSettings.type = { $regex: type, $options: 'i' };
    if (filter)
      searchSettings.$or = [
        { orderNumber: { $regex: filter, $options: 'i' } },
        { deviceID: { $regex: filter, $options: 'i' } },
        { model: { $regex: filter, $options: 'i' } },
        { description: { $regex: filter, $options: 'i' } },
        { customerName: { $regex: filter, $options: 'i' } },
        { phoneNumber: { $regex: filter, $options: 'i' } },
      ];

    const data = await Contacts.find(searchSettings, null, {
      skip,
      limit,
    }).sort({
      startDate: -1,
      createdAt: -1,
    });
    const totalOrders = await Contacts.find(searchSettings).count();

    res.status(200);
    res.json({ code: 200, data: data, totalOrders });
  });

  addContact = tryCatchDecorator(async (req, res) => {
    const { _id: owner } = req.user;

    const newOrderNumber = await UserSettings.findOneAndUpdate(
      {
        owner,
      },
      { $inc: { orderNumber: 1 } },
      { new: true }
    );

    const data = await Contacts.create({
      ...req.body,
      owner,
      orderNumber: newOrderNumber.orderNumber,
    });

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

    if (updatedContact.status?.toLowerCase() === 'видано') {
      const contact = await Contacts.findById(id);
      if (!contact) throw httpError(404, `id ${id} Not Found`);

      const archivedContact = await Archive.create(contact._doc);
      await contact.deleteOne();
      res.status(200);
      res.json({
        code: 200,
        message: 'The contact has been updated and moved to the archive',
        data: archivedContact,
      });
      return;
    }

    res.status(200);
    res.json({
      code: 200,
      message: 'Contact is updated',
      data: updatedContact,
    });
  });

  getArchive = tryCatchDecorator(async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, type, filter } = req.query;
    const skip = (page - 1) * limit;

    const searchSettings = {
      owner,
    };

    if (type) searchSettings.type = { $regex: type, $options: 'i' };
    if (filter)
      searchSettings.$or = [
        { orderNumber: { $regex: filter, $options: 'i' } },
        { deviceID: { $regex: filter, $options: 'i' } },
        { model: { $regex: filter, $options: 'i' } },
        { description: { $regex: filter, $options: 'i' } },
        { customerName: { $regex: filter, $options: 'i' } },
        { phoneNumber: { $regex: filter, $options: 'i' } },
      ];

    const data = await Archive.find(searchSettings, null, {
      skip,
      limit,
    }).sort({
      startDate: -1,
      createdAt: -1,
    });
    const totalOrders = await Archive.find(searchSettings).count();

    res.status(200);
    res.json({ code: 200, data: data, totalOrders });
  });
}

module.exports = new ContactsController();
