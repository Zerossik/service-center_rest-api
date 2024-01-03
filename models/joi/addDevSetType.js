const joi = require('joi');

const addDevSetTypeJoiSchema = joi.object({
  type: joi.string().required(),
});
module.exports = addDevSetTypeJoiSchema;
