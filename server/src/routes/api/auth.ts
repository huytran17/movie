import express from "express";
import passport from "passport";
import authenticateJWT from "../../middlewares/authenticateJWT";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";
import { signInRules, signUpRules } from "../../controllers/auth/validators";
import { signUpController, signInController } from "../../controllers/auth";

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

export default authRouter;
