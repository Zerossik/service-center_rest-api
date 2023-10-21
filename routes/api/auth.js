const authRouter = require('express').Router();
const { AuthController } = require('../../controllers');
const { validateBody } = require('../../middleware');
const { joiUserSchemaSignUp, joiUserSchemaSignIn } = require('../../models');

authRouter.post(
  '/signup',
  validateBody(joiUserSchemaSignUp),
  AuthController.signup
);

authRouter.post(
  '/signin',
  validateBody(joiUserSchemaSignIn),
  AuthController.signin
);
authRouter.get('/google', AuthController.google);
authRouter.get('/google-redirect', AuthController.googleRedirect);
module.exports = authRouter;
