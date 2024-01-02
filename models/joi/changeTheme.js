const joi = require('joi');

const changeThemeJoiScheme = joi.object({
  theme: joi.string().required(),
});
module.exports = changeThemeJoiScheme;
