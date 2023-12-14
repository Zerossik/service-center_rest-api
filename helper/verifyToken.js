const jwt = require('jsonwebtoken');

const verifyToken = (token = '') => {
  const { SECRET_KEY } = process.env;
  return jwt.verify(token, SECRET_KEY);
};

module.exports = verifyToken;
