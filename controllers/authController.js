const { User } = require('../models/user');
const { tryCatchDecorator } = require('../decorators');
const { httpError } = require('../helper');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

class AuthController {
  signup = tryCatchDecorator(async (req, res) => {
    const { email, password } = req.body;
    const getUserByEmail = await User.findOne({ email });

    if (getUserByEmail) throw httpError(409);

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = nanoid(10);

    const userCreated = await User.create({
      ...req.body,
      password: hashPassword,
      verificationToken,
    });
    res.status(201);
    res.json({
      code: 201,
      data: userCreated,
    });
  });

  signin = (req, res) => {
    res.status(200).json({ message: 'OK' });
  };
}

module.exports = new AuthController();
