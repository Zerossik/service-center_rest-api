const joi = require('joi');

const tableSettingsJoiSchema = joi.array().items(
  joi.object({
    id: joi.string().required(),
    order: joi.number().required(),
    buttonName: joi.string().required(),
    columnName: joi.string().required(),
    isActive: joi.boolean().required(),
    isVisible: joi.boolean().required(),
    isDisabled: joi.boolean().required(),
    sortDown: [joi.boolean(), null],
  })
);

module.exports = tableSettingsJoiSchema;
