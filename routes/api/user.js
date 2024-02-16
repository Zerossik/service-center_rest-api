const { UserController } = require('../../controllers');
const { isAuthenticated, validateBody } = require('../../middleware');
const {
  devSetTypeJoiSchema,
  devSetManufacturerJoiSchema,
  changeThemeJoiScheme,
  addMasterjoiSchema,
  deleteMasterJoiSchema,
  devTypeUpdateJoiSchema,
  devManufUpdJoiSchema,
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
userRouter.get('/deviceSettings', UserController.getDevSet);
userRouter.post(
  '/deviceSettingsType',
  validateBody(devSetTypeJoiSchema),
  UserController.addDevType
);
userRouter.post(
  '/deviceSettingsManufacturer',
  validateBody(devSetManufacturerJoiSchema),
  UserController.addDevManufacturer
);
userRouter.patch(
  '/deviceTypeUpdate',
  validateBody(devTypeUpdateJoiSchema),
  UserController.devTypeUpdate
);
userRouter.patch(
  '/deviceManufacturerUpdate',
  validateBody(devManufUpdJoiSchema),
  UserController.devManufacturerUpdate
);
userRouter.delete(
  '/deviceType',
  validateBody(devSetTypeJoiSchema),
  UserController.deleleType
);
userRouter.delete(
  '/deviceManufacturer',
  validateBody(devSetManufacturerJoiSchema),
  UserController.deleteManufacturer
);

module.exports = userRouter;
