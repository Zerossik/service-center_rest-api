const authRouter = require('express').Router();
const { AuthController } = require('../../controllers');

authRouter.post(
  '/signup',
  (req, res, next) => {
    console.log(AuthController.signup);
    next();
  },
  AuthController.signup
);
authRouter.post('signin', AuthController.signin);
module.exports = authRouter;
