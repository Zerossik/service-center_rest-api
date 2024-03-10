const { User, joiUserSchemaSignUp, joiUserSchemaSignIn } = require('./user');
const { Contacts, joiContactSchema, Archive } = require('./contacts');

module.exports = {
  User,
  TokenModel: require('./tokenModel'),
  joiUserSchemaSignUp,
  joiUserSchemaSignIn,
  GoogleModel: require('./googleModel'),
  Contacts,
  joiContactSchema,
  UserSettings: require('./UserSettings'),
  Archive,
};
