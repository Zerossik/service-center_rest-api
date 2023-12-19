const { User, GoogleModel, TokenModel } = require('../models');
const { tryCatchDecorator } = require('../decorators');
const { httpError, createToken, sendEmail, verifyToken } = require('../helper');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const queryString = require('query-string');
const { URL } = require('url');
const axios = require('axios');
const resetPassEmail = require('../template/resetPasswordEmail');
const crypto = require('crypto');

class AuthController {
  signup = tryCatchDecorator(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) throw httpError(400, 'Bad Request');

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

    if (!email || !password) throw httpError(400, 'Bad Request');

    const user = await User.findOne({ email });

    if (!user || !user.password)
      throw httpError(401, 'Email or password is wrong');
    // if (!user.veryfy) throw httpError(401, 'email address not confirmed'); // необхідно реалізувати підтвердження email користувача.

    const veryfyPass = await bcrypt.compare(password, user.password);

    if (!veryfyPass) throw httpError(401, 'Email or password is wrong');

    const token = createToken(user._id);

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

  requestPasswordReset = tryCatchDecorator(async (req, res) => {
    const { email } = req.body;
    if (!email) throw httpError(400);

    const user = await User.findOne({ email });
    if (!user) throw httpError(404, `user ${email} not found`);

    const token = await TokenModel.findOne({ user: user._id });
    if (token) token.deleteOne();

    const newToken = crypto.randomBytes(32).toString('hex');
    const hashToken = await bcrypt.hash(newToken, 10);

    await new TokenModel({
      user: user._id,
      token: hashToken,
      createdAt: Date.now(),
    }).save();

    const data = {
      to: email,
      subject: 'Скидання паролю',
      html: resetPassEmail(newToken, user._id),
    };

    sendEmail(data)
      .then(() => console.log('Email sended'))
      .catch(error => console.log(error.message));

    res.status(204);
    res.json({ code: 204, message: 'no Content' });
  });

  verifyToken = tryCatchDecorator(async (req, res) => {
    const { token: resetToken, id } = req.body;
    if (!(resetToken && id)) throw httpError(400);

    const data = await TokenModel.findOne({ user: id });
    if (!data) throw httpError(404);

    const isValidToken = await bcrypt.compare(resetToken, data.token);
    if (!isValidToken) throw httpError(404);

    res.status(200);
    res.json({ code: 200, message: 'Token is valid' });
  });

  resetPassword = tryCatchDecorator(async (req, res) => {
    const { token } = req.params;
    const { password, id } = req.body;
    if (!(password, token, id)) throw httpError(400);

    const resetToken = await TokenModel.findOne({ user: id });
    if (!resetToken) throw httpError(404);

    const newPass = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(
      id,
      { password: newPass },
      { new: true }
    );
    const data = {
      to: user.email,
      subject: 'Скидання паролю',
      html: `<p> ${user.name} ваш пароль успішно замінено</p>`,
    };

    sendEmail(data)
      .then(() => console.log('Email sended'))
      .catch(error => console.log(error.message));

    resetToken.deleteOne();

    res.status(201);
    res.json({ code: 201, message: 'your password was reseted' });
  });

  loguot = tryCatchDecorator(async (req, res) => {
    const { _id: id } = req.user;
    await User.findByIdAndUpdate(id, { token: '' });
    res.status(204);
    res.json({ message: 'No Content' });
  });

  current = tryCatchDecorator(async (req, res) => {
    const { user } = req;

    res.status(200);
    res.json({
      code: 200,
      token: user.token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        theme: user.theme,
        masters: user.masters,
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
      // access_type: 'offline',
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

    const { email, name } = userData.data;

    const user = await GoogleModel.findOne({ email });

    if (!user) {
      const newUser = { email, name };
      const createdUser = await GoogleModel.create({
        ...newUser,
      });

      createdUser.token = createToken(createdUser._id);
      createdUser.save();

      return res.redirect(`${BASE_URL}?token=${createdUser.token}`);
    }

    user.token = createToken(user._id);
    user.save();

    res.redirect(`${BASE_URL}?token=${user.token}`);
  };
}

module.exports = new AuthController();
