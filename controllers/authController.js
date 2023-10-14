const { User } = require('../models');
const { tryCatchDecorator } = require('../decorators');
const { httpError } = require('../helper');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');
const queryString = require('query-string');
const { URL } = require('url');
const axios = require('axios');

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

  google = (req, res, next) => {
    const { GOOGLE_ID, BASE_URL } = process.env;
    const stringifiedParams = queryString.stringify({
      client_id: GOOGLE_ID,
      redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ].join(' '),
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
    });
    return res.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
    );
  };

  googleRedirect = async (req, res) => {
    const { GOOGLE_ID, GOOGLE_SECRET, BASE_URL } = process.env;
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

    const urlObj = new URL(fullUrl);
    const urlParams = queryString.parse(urlObj.search);
    const code = urlParams.code;
    if (!code)
      return res.status(400).json({ code: 400, message: 'bad request' });

    const token = await axios({
      url: 'https://oauth2.googleapis.com/token',
      method: 'post',
      data: {
        client_id: GOOGLE_ID,
        client_secret: GOOGLE_SECRET,
        redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
        grant_type: 'authorization_code',
        code,
      },
    });

    const userData = await axios({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      method: 'get',
      headers: {
        Authorization: `Bearer ${token.data.access_token}`,
      },
    });
    console.log(userData.data);

    // моя логика работы с базой
    res.redirect(`http://127.0.0.1:5500`);
  };
}

module.exports = new AuthController();
