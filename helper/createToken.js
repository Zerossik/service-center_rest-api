const jwt = require('jsonwebtoken');

const createToken = (user = {}) => {
  const { SECRET_KEY } = process.env;

  const payload = {
    id: user._id,
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: '30d' });
};

module.exports = createToken;
