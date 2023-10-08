const { Schema, model } = require('mongoose');
const joi = require('joi');

const joiUserSchema = joi.object({
  email: joi
    .string()
    .required()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/),

  password: joi.string().required().min(6),
});

const userSchema = new Schema(
  {
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
);

const User = model('user', userSchema);

module.exports = {
  User,
  joiUserSchema,
};
