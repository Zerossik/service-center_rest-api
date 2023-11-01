const { Schema, model: newModel } = require('mongoose');

const contactSchema = new Schema({
  orderNumber: {
    type: String,
    required: [true, 'order number is required'],
    unique: true,
  },
  type: { type: String, required: [true, 'device type is required'] },
  manufacturer: { type: String, required: [true, 'manufacturer is required'] },
  model: { type: String, required: [true, 'model is required'] },
  divaceID: { type: String, default: '' },
  customerName: { type: String, required: [true, 'customer name is required'] },
  phoneNumber: { type: String, required: [true, 'phone number is required'] },
  price: { type: Number, default: 0 },
  status: {
    type: String,
    default: 'accepted',
    masterName: { type: String, default: '' },
    endDate: { type: Date, default: Date.now },
  },
});

const Contacts = newModel('contacts', contactSchema);

module.exports = { Contacts };
