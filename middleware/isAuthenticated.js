const { httpError } = require('../helper');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const isAuthenticated = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
}
  try {
    const { SECRET_KEY } = process.env;

    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      throw httpError(401, 'Not authorized');
    }

    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token) {
      throw httpError(401, 'Not authorized');
    }

    req.user = user;
    next();
  } catch (error) {
    next(httpError(401, 'Not authorized'));
  }
};

module.exports = isAuthenticated;
