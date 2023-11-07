const contactsRouter = require('express').Router();
const { isAuthenticated } = require('../../middleware');
const { ContactsController } = require('../../controllers');

contactsRouter.use(isAuthenticated);

contactsRouter.get('/', ContactsController.getAll);
contactsRouter.post('/', ContactsController.addContact);
module.exports = contactsRouter;
