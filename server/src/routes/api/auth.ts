import express from "express";
import passport from "passport";

const authRouter = express.Router();

authRouter.post("/login", passport.authenticate("jwt", { session: false }));

export default authRouter;
