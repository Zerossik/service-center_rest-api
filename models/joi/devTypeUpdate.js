const joi = require('joi');

const devTypeUpdateJoiSchema = joi.object({
  oldType: joi.string().required(),
  newType: joi.string().required(),
});

module.exports = devTypeUpdateJoiSchema;
