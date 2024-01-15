const joi = require('joi');

const devSetTypeJoiSchema = joi.object({
  type: joi.string().required(),
});
module.exports = devSetTypeJoiSchema;
