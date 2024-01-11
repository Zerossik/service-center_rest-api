const joi = require('joi');

const devManufUpdJoiSchema = joi.object({
  oldManufacturer: joi.string().required(),
  newManufacturer: joi.string().required(),
});

module.exports = devManufUpdJoiSchema;
