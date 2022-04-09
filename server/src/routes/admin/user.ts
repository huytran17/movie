import express from "express";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";

import {
  getUserRules,
  updateUserRules,
  uploadUserAvatarRules,
  deleteUserRules,
} from "../../controllers/admin/user/validators";
import {
  getUserController,
  updateUserController,
  uploadUserAvatarController,
  getUsersController,
  deleteUserController,
} from "../../controllers/admin/user";

const userRouter = express.Router();

userRouter.delete(
  "/delete/:user_id",
  makeValidator(deleteUserRules),
  makeExpressCallback(deleteUserController)
);

userRouter.get(
  "/:user_id",
  makeValidator(getUserRules),
  makeExpressCallback(getUserController)
);

userRouter.post(
  "/upload-avatar/:user_id",
  makeValidator(uploadUserAvatarRules),
  makeExpressCallback(uploadUserAvatarController)
);

userRouter.put(
  "/",
  makeValidator(updateUserRules),
  makeExpressCallback(updateUserController)
); // DONE

userRouter.get("/", makeExpressCallback(getUsersController)); // DONE

export default userRouter;
