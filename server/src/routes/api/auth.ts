import express from "express";
import passport from "passport";
import authenticateJWT from "../../middlewares/authenticateJWT";
import makeValidator from "../../middlewares/validator-middleware";
import { loginRules } from "../../controllers/auth/validators";

const authRouter = express.Router();

authRouter.post("/login", makeValidator(loginRules));

export default authRouter;
