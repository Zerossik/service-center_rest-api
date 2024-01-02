const joi = require('joi');

const deleteMasterJoiSchema = joi.object({
  id: joi.string().required(),
});
module.exports = deleteMasterJoiSchema;
