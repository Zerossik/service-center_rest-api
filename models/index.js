const { User, joiUserSchemaSignUp, joiUserSchemaSignIn } = require('./user');
const { Contacts, joiContactSchema } = require('./contacts');

module.exports = {
  User,
  joiUserSchemaSignUp,
  joiUserSchemaSignIn,
  GoogleModel: require('./googleModel'),
  Contacts,
  joiContactSchema,
};
