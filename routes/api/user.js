const { UserController } = require('../../controllers');
const { isAuthenticated } = require('../../middleware');

const userRouter = require('express').Router();
userRouter.use(isAuthenticated);
userRouter.post('/changeTheme', UserController.changeTheme);
userRouter.post('/addMaster', UserController.addMaster);
userRouter.delete('/deleteMaster', UserController.deleteMaster);
userRouter.post('/addDeviceSettings', UserController.addDevSet);

module.exports = userRouter;
