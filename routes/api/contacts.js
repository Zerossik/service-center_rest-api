const contactsRouter = require('express').Router();
const { isAuthenticated, validateBody } = require('../../middleware');
const { ContactsController } = require('../../controllers');
const { joiContactSchema } = require('../../models');

contactsRouter.use(isAuthenticated);

contactsRouter.get('/', ContactsController.getAll);
contactsRouter.post(
  '/',
  validateBody(joiContactSchema),
  ContactsController.addContact
);
module.exports = contactsRouter;
