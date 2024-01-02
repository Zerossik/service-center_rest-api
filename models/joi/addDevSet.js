const joi = require('joi');

const addDevSetJoiSchema = joi.object({
  type: joi.string(),
  manufacturer: joi.string(),
});

module.exports = addDevSetJoiSchema;
