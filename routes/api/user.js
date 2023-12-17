const { UserController } = require('../../controllers');

const userRouter = require('express').Router();

userRouter.post('/changeTheme', UserController.changeTheme);

module.exports = userRouter;
