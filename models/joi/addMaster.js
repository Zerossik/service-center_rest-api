const joi = require('joi');

const addMasterjoiSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
});

module.exports = addMasterjoiSchema;
