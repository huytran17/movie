import express from "express";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";

import {
  getUserRules,
  updateUserRules,
  uploadUserAvatarRules,
} from "../../controllers/api/user/validators";
import {
  getUserController,
  updateUserController,
  uploadUserAvatarController,
} from "../../controllers/api/user";
import { upload } from "../../middlewares/file-upload-middleware";

const userRouter = express.Router();

userRouter.get(
  "/:user_id",
  makeValidator(getUserRules),
  makeExpressCallback(getUserController)
);

userRouter.post(
  "/upload-avatar/:user_id",
  upload.single("file"),
  makeValidator(uploadUserAvatarRules),
  makeExpressCallback(uploadUserAvatarController)
);

userRouter.put(
  "/",
  makeValidator(updateUserRules),
  makeExpressCallback(updateUserController)
); // DONE

export default userRouter;
