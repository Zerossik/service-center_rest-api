const { UserController } = require('../../controllers');
const { isAuthenticated, validateBody } = require('../../middleware');
const {
  addDevSetTypeJoiSchema,
  addDevSetManufacturerJoiSchema,
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
  '/deviceSettingsType',
  validateBody(addDevSetTypeJoiSchema),
  UserController.addDevType
);
userRouter.post(
  '/deviceSettingsManufacturer',
  validateBody(addDevSetManufacturerJoiSchema),
  UserController.addDevManufacturer
);

userRouter.get('/deviceSettings', UserController.getDevSet);
module.exports = userRouter;
