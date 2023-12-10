const { Schema, model } = require('mongoose');

const tokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User ID is required'],
    ref: 'user',
  },
  token: {
    type: String,
    required: [true, 'token is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // this is the expiry time in seconds
  },
});

const TokenModel = model('tokens', tokenSchema);
module.exports = TokenModel;
