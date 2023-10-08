const authRouter = require('express').Router();
const { AuthController } = require('../../controllers');

authRouter.post('/signup', AuthController.signup);
authRouter.post('signin', AuthController.signin);
module.exports = authRouter;
