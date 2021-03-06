import express from "express";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";
import {
  signInRules,
  signUpRules,
  updatePasswordRules,
  logoutRules,
} from "../../controllers/api/auth/validators";
import {
  signUpController,
  signInController,
  verifyController,
  autoSignInController,
  getUserController,
  updatePasswordController,
  logoutController,
} from "../../controllers/api/auth";

import authenticateUserJWT from "../../middlewares/authenticateUserJWT";
import autoSignIn from "../../middlewares/autoSignIn";

const authRouter = express.Router();

authRouter.post(
  "/logout",
  authenticateUserJWT(),
  makeValidator(logoutRules),
  makeExpressCallback(logoutController)
); // DONE
authRouter.put(
  "/security/:user_id",
  makeValidator(updatePasswordRules),
  makeExpressCallback(updatePasswordController)
);

authRouter.get(
  "/",
  authenticateUserJWT(),
  makeExpressCallback(getUserController)
); // DONE
authRouter.post(
  "/sign-in",
  makeValidator(signInRules),
  makeExpressCallback(signInController)
);

authRouter.post(
  "/sign-up",
  makeValidator(signUpRules),
  makeExpressCallback(signUpController)
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
