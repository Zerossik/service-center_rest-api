const { User, joiUserSchemaSignUp, joiUserSchemaSignIn } = require('./user');

module.exports = {
  User,
  joiUserSchemaSignUp,
  joiUserSchemaSignIn,
  GoogleModel: require('./googleModel'),
};
