const joi = require('joi');

const emailJoiSchema = joi.object({
  email: joi.string().email().required(),
});

module.exports = emailJoiSchema;
