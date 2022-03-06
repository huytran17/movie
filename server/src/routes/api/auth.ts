import express from "express";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";
import { signInRules, signUpRules } from "../../controllers/auth/validators";
import {
  signUpController,
  signInController,
  verifyController,
} from "../../controllers/auth";
import authenticateUserJWT from "../../middlewares/authenticateUserJWT";

const authRouter = express.Router();

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

export default authRouter;
