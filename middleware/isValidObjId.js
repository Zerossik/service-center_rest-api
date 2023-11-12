const { isValidObjectId } = require('mongoose');
const { httpError } = require('../helper');

const isValidObjtId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) throw httpError(404, `id ${id} Not Found`);
  next();
};

module.exports = isValidObjtId;
