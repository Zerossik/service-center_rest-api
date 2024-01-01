const { Schema, model: newModel } = require('mongoose');
const joi = require('joi');

const joiContactSchema = joi.object({
  type: joi.string().required(),
  manufacturer: joi.string().required(),
  model: joi.string().required(),
  deviceID: joi.string(),
  customerName: joi.string().required(),
  phoneNumber: joi.string().required(),
  price: joi.number(),
  status: joi.string(),
  masterName: joi.string(),
  startDate: joi.date(),
  endDate: joi.date(),
  description: joi.string(),
  failure: joi.string().required(),
});

const contactSchema = new Schema({
  orderNumber: {
    type: String,
    default: '1',
  },
  type: { type: String, required: [true, 'device type is required'] },
  manufacturer: { type: String, required: [true, 'manufacturer is required'] },
  model: { type: String, required: [true, 'model is required'] },
  deviceID: { type: String, default: '' },
  customerName: { type: String, required: [true, 'customer name is required'] },
  phoneNumber: { type: String, required: [true, 'phone number is required'] },
  price: { type: Number, default: 0 },
  status: {
    type: String,
    default: 'accepted',
  },
  masterName: { type: String, default: '' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  owner: { type: Schema.Types.ObjectId, ref: 'user' },
  description: { type: String },
  failure: { type: String, required: [true, 'failure is required'] }, // несправність
});

const Contacts = newModel('contacts', contactSchema);

module.exports = { Contacts, joiContactSchema };
