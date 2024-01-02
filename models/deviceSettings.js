const { Schema, model } = require('mongoose');

const deviceSettingsSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'User ID is requires'],
  },
  deviceTypes: {
    type: [{ id: Schema.Types.ObjectId, deviceType: String }],
    default: [],
  },
  deviceManufacturers: {
    type: [{ id: Schema.Types.ObjectId, manufacturer: String }],
    default: [],
  },
});

const DevSetModel = model('deviceSettings', deviceSettingsSchema);

module.exports = DevSetModel;
