import express from "express";
import passport from "passport";
import authenticateJWT from "../../middlewares/authenticateJWT";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";
import { loginRules, signUpRules } from "../../controllers/auth/validators";
// import { loginController } from "../../controllers/auth";

const authRouter = express.Router();

authRouter.post(
  "/login",
  makeValidator(loginRules)
  // makeExpressCallback(loginController)
);

authRouter.post(
  "/sign-up",
  makeValidator(signUpRules)
  // makeExpressCallback(loginController)
);

export default authRouter;
