import express from "express";
import passport from "passport";
import authenticateJWT from "../../middlewares/authenticateJWT";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";
import { loginRules, signUpRules } from "../../controllers/auth/validators";
import { signUpController, loginController } from "../../controllers/auth";

const authRouter = express.Router();

authRouter.post(
  "/sign-in",
  makeValidator(loginRules),
  makeExpressCallback(loginController)
);

authRouter.post(
  "/sign-up",
  makeValidator(signUpRules),
  makeExpressCallback(signUpController)
);

export default authRouter;
