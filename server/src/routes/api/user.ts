import express from "express";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";

import { getUserRules } from "../../controllers/user/validators";
import { getUserController } from "../../controllers/user";

const userRouter = express.Router();

userRouter.get(
  "/:user_id",
  makeValidator(getUserRules),
  makeExpressCallback(getUserController)
);

export default userRouter;
