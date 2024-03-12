const { Schema, model } = require('mongoose');

const archiveSchema = new Schema(
  {
    orderNumber: {
      type: String,
      default: '1',
    },
    type: { type: String, required: [true, 'device type is required'] },
    manufacturer: {
      type: String,
      required: [true, 'manufacturer is required'],
    },
    model: { type: String, required: [true, 'model is required'] },
    deviceID: { type: String, default: '' },
    customerName: {
      type: String,
      required: [true, 'customer name is required'],
    },
    phoneNumber: { type: String, required: [true, 'phone number is required'] },
    price: { type: Number, default: 0 },
    status: {
      type: String,
      default: 'Прийнято',
    },
    masterName: { type: String, default: '' },
    endDate: { type: Date },
    owner: { type: Schema.Types.ObjectId, ref: 'user' },
    description: { type: String },
    issueDate: {
      type: Date,
      required: [true, 'issue date is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

const Archive = model('archives', archiveSchema);

module.exports = Archive;
