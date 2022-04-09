import express from "express";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";
import { signInRules } from "../../controllers/admin/auth/validators";
import {
  signInController,
  verifyController,
  autoSignInController,
} from "../../controllers/admin/auth";
import authenticateUserJWT from "../../middlewares/authenticateUserJWT";
import autoSignIn from "../../middlewares/autoSignIn";

const authRouter = express.Router();

authRouter.post(
  "/sign-in",
  makeValidator(signInRules),
  makeExpressCallback(signInController)
);

authRouter.get(
  "/verify",
  authenticateUserJWT(),
  makeExpressCallback(verifyController)
);

authRouter.get(
  "/auto-sign-in",
  autoSignIn(),
  makeExpressCallback(autoSignInController)
);

export default authRouter;
