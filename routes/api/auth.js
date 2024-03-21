const authRouter = require('express').Router();
const { AuthController } = require('../../controllers');
const { validateBody } = require('../../middleware');
const { joiUserSchemaSignUp, joiUserSchemaSignIn } = require('../../models');
const { isAuthenticated } = require('../../middleware');
const { emailJoiSchema } = require('../../models/joi');

authRouter.post(
  '/signup',
  validateBody(joiUserSchemaSignUp),
  AuthController.signup
);
authRouter.get('/verify/:verificationToken', AuthController.verifyEmail);
authRouter.post(
  '/resendEmail',

  AuthController.resendEmail
);

authRouter.post(
  '/signin',
  validateBody(joiUserSchemaSignIn),
  AuthController.signin
);

authRouter.post('/resetPassword', AuthController.requestPasswordReset);
authRouter.post('/resetPassword/verify', AuthController.verifyToken);
authRouter.post('/resetPassword/:token', AuthController.resetPassword);

authRouter.post('/logout', isAuthenticated, AuthController.loguot);
authRouter.get('/current', isAuthenticated, AuthController.current);

authRouter.get('/google', AuthController.google);
authRouter.get('/google-redirect', AuthController.googleRedirect);

module.exports = authRouter;
