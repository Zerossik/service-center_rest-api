const { User } = require('../models');
const { tryCatchDecorator } = require('../decorators');
const { httpError } = require('../helper');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');

class AuthController {
  signup = tryCatchDecorator(async (req, res) => {
    const { name, email, password } = req.body;
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
      data: {
        id: userCreated._id,
        name: userCreated.name,
        email: userCreated.email,
      },
    });
  });

  signin = tryCatchDecorator(async (req, res) => {
    const { email, password } = req.body;

    const { SECRET_KEY } = process.env;

    const user = await User.findOne({ email });

    if (!user) throw httpError(401, 'Email or password is wrong');

    const veryfyPass = await bcrypt.compare(password, user.password);

    if (!veryfyPass) throw httpError(401, 'Email or password is wrong');

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '30d' });

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200);
    res.json({
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  });
}

module.exports = new AuthController();
