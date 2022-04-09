import express from "express";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";
import { signInRules } from "../../controllers/admin/auth/validators";
import {
  signInController,
  verifyController,
  autoSignInController,
  getAdminController,
} from "../../controllers/admin/auth";
import authenticateAdminJWT from "../../middlewares/authenticateAdminJWT";
import autoSignIn from "../../middlewares/autoSignIn";

const authRouter = express.Router();

authRouter.post(
  "/sign-in",
  makeValidator(signInRules),
  makeExpressCallback(signInController)
);

authRouter.get(
  "/verify",
  authenticateAdminJWT(),
  makeExpressCallback(verifyController)
);

authRouter.get(
  "/",
  authenticateAdminJWT(),
  makeExpressCallback(getAdminController)
); // DONE

authRouter.get(
  "/auto-sign-in",
  autoSignIn(),
  makeExpressCallback(autoSignInController)
);

export default authRouter;
