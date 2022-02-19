import express from "express";
import passport from "passport";
import authenticateJWT from "../../middlewares/authenticateJWT";

const authRouter = express.Router();

authRouter.get("/login", authenticateJWT());

export default authRouter;
