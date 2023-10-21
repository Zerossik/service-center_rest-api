const { Schema, model } = require('mongoose');

const googleAuthSchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },

    token: String,
    veryfy: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const GoogleModel = model('users', googleAuthSchema);

module.exports = GoogleModel;
