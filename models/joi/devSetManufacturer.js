const joi = require('joi');

const devSetManufacturerJoiSchema = joi.object({
  manufacturer: joi.string().required(),
});
module.exports = devSetManufacturerJoiSchema;
