const { httpError } = require('../helper');

const validateBody = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body); // повертає об"єкт з ключем - value. У разі помилки буде ще ключ - error
    if (error) next(httpError(404, error.message));
    next();
  };
};

module.exports = validateBody;
