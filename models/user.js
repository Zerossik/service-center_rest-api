const { Schema, model } = require('mongoose');
const joi = require('joi');

const joiUserSchemaSignUp = joi.object({
  name: joi.string().required(),
  email: joi
    .string()
    .required()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/),

  password: joi.string().required().min(6),
}); // JOI схема реєстрації користувача

const joiUserSchemaSignIn = joi.object({
  email: joi
    .string()
    .required()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/),
  password: joi.string().required().min(6),
}); // JOI схема авторізації користувача

const userSchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    token: String,
    veryfy: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
); // Схема для моделі MongoDB

const User = model('user', userSchema);

module.exports = {
  User,
  joiUserSchemaSignUp,
  joiUserSchemaSignIn,
};
