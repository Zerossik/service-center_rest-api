const { Schema, model: newModel } = require('mongoose');
const joi = require('joi');
const { firstLetterUpperCase } = require('../helper');

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
  endDate: joi.date(),
  description: joi.string(),
});

const contactSchema = new Schema(
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
  },
  { versionKey: false, timestamps: true }
);
contactSchema.pre('save', function (next) {
  this.type = firstLetterUpperCase(this.type.trim());
  this.manufacturer = firstLetterUpperCase(this.manufacturer.trim());
  this.customerName = firstLetterUpperCase(this.customerName.trim());
  if (this.masterName.trim()) {
    this.masterName = firstLetterUpperCase(this.masterName.trim());
  }

  next();
});
contactSchema.pre('findOneAndUpdate', function (next) {
  const { type, manufacturer, customerName, masterName } = this._update;
  Object.keys(this._update).map(el => {
    switch (el) {
      case 'type':
        this._update[el] = firstLetterUpperCase(type.trim());
        break;
      case 'manufacturer':
        this._update[el] = firstLetterUpperCase(manufacturer.trim());
        break;
      case 'customerName':
        this._update[el] = firstLetterUpperCase(customerName.trim());
        break;
      case 'masterName':
        this._update[el] = firstLetterUpperCase(masterName.trim());
        break;
      default:
        el;
    }
  });
  next();
});

const Contacts = newModel('contacts', contactSchema);

module.exports = { Contacts, joiContactSchema };
