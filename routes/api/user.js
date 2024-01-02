const { UserController } = require('../../controllers');
const { isAuthenticated, validateBody } = require('../../middleware');
const {
  addDevSetJoiSchema,
  changeThemeJoiScheme,
  addMasterjoiSchema,
  deleteMasterJoiSchema,
} = require('../../models/joi');

const userRouter = require('express').Router();
userRouter.use(isAuthenticated);
userRouter.post(
  '/changeTheme',
  validateBody(changeThemeJoiScheme),
  UserController.changeTheme
);
userRouter.post(
  '/addMaster',
  validateBody(addMasterjoiSchema),
  UserController.addMaster
);
userRouter.delete(
  '/deleteMaster',
  validateBody(deleteMasterJoiSchema),
  UserController.deleteMaster
);

userRouter.post(
  '/deviceSettings',
  validateBody(addDevSetJoiSchema),
  UserController.addDevSet
);
userRouter.get('/deviceSettings', UserController.getDevSet);
module.exports = userRouter;
