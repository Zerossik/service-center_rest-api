const contactsRouter = require('express').Router();
const {
  isAuthenticated,
  validateBody,
  isValidObjtId,
} = require('../../middleware');
const { ContactsController } = require('../../controllers');
const { joiContactSchema } = require('../../models');

contactsRouter.use(isAuthenticated);

contactsRouter.get('/', ContactsController.getAll);
contactsRouter.get('/archive', ContactsController.getArchive);
contactsRouter.get('/:id', isValidObjtId, ContactsController.getContactById);

contactsRouter.post(
  '/',
  validateBody(joiContactSchema),
  ContactsController.addContact
);
contactsRouter.delete('/:id', isValidObjtId, ContactsController.deleteContact);
contactsRouter.patch('/:id', ContactsController.updateContact);

module.exports = contactsRouter;
