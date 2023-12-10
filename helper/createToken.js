const jwt = require('jsonwebtoken');

const createToken = (id = '', time = '30d') => {
  const { SECRET_KEY } = process.env;
  console.log(id);

  const payload = {
    id,
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: time });
};

module.exports = createToken;
