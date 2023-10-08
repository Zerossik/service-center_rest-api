const authRouter = require('express').Router();
const { AuthController } = require('../../controllers');
const { validateBody } = require('../../middleware');
const { joiUserSchema } = require('../../models');

authRouter.post('/signup', validateBody(joiUserSchema), AuthController.signup);
authRouter.post('signin', AuthController.signin);
module.exports = authRouter;
