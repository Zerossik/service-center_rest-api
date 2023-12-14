const jwt = require('jsonwebtoken');

const verifyToken = (token = '') => {
  const { SECRET_KEY } = process.env;
  return jwt.verify(token, SECRET_KEY, (error, decode) => {
    if (error) return false;
    return decode;
  });
};

module.exports = verifyToken;
