import express from "express";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";

import {
  deleteAdminRules,
  updateAdminRules,
  uploadAdminAvatarRules,
  getAdminRules,
  createAdminRules,
  restoreAdminRules,
  updatePasswordRules,
} from "../../controllers/admin/admin/validators";
import {
  getAdminController,
  updateAdminController,
  uploadAdminAvatarController,
  getAdminsController,
  deleteAdminController,
  createAdminController,
  restoreAdminController,
  updatePasswordController,
} from "../../controllers/admin/admin";
import { upload } from "../../middlewares/file-upload-middleware";

const adminRouter = express.Router();

adminRouter.get(
  "/:admin_id",
  makeValidator(getAdminRules),
  makeExpressCallback(getAdminController)
);

adminRouter.post(
  "/create-admin",
  makeValidator(createAdminRules),
  makeExpressCallback(createAdminController)
);

adminRouter.post(
  "/upload-avatar/:admin_id",
  upload.single("file"),
  makeValidator(uploadAdminAvatarRules),
  makeExpressCallback(uploadAdminAvatarController)
);

adminRouter.put(
  "/:admin_id",
  makeValidator(updateAdminRules),
  makeExpressCallback(updateAdminController)
);

adminRouter.put(
  "/security/:admin_id",
  makeValidator(updatePasswordRules),
  makeExpressCallback(updatePasswordController)
);

adminRouter.get("/", makeExpressCallback(getAdminsController));

adminRouter.delete(
  "/restore/:admin_id",
  makeValidator(restoreAdminRules),
  makeExpressCallback(restoreAdminController)
);

adminRouter.delete(
  "/delete/:admin_id",
  makeValidator(deleteAdminRules),
  makeExpressCallback(deleteAdminController)
);

export default adminRouter;
