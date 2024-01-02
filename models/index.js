const { User, joiUserSchemaSignUp, joiUserSchemaSignIn } = require('./user');
const { Contacts, joiContactSchema } = require('./contacts');

module.exports = {
  User,
  TokenModel: require('./tokenModel'),
  joiUserSchemaSignUp,
  joiUserSchemaSignIn,
  GoogleModel: require('./googleModel'),
  Contacts,
  joiContactSchema,
  DevSetModel: require('./deviceSettings'),
};
