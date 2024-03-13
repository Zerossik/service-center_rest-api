const { Schema, model } = require('mongoose');

const UserSettingsSchema = new Schema({
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

  orderNumber: {
    type: Number,
    default: 0,
  },
  tableSettings: {
    type: [
      {
        _id: false,
        id: String,
        order: Number,
        buttonName: String,
        columnName: String,
        isActive: Boolean,
        isVisible: Boolean,
        isDisabled: Boolean,
        sortDown: null || Boolean,
      },
    ],
    default: [],
  },
});

const UserSettings = model('userSettings', UserSettingsSchema);

module.exports = UserSettings;
