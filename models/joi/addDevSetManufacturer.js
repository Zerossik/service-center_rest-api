const joi = require('joi');

const addDevSetManufacturerJoiSchema = joi.object({
  manufacturer: joi.string().required(),
});
module.exports = addDevSetManufacturerJoiSchema;
