import express from "express";
import authenticateUserJWT from "../../middlewares/authenticateUserJWT";

const adminRouter = express.Router();

import authRouter from "./auth";
import filmRouter from "./film";
import analyticRouter from "./analytics";
import userRouter from "./user";

adminRouter.use("/auth", authRouter);
adminRouter.use("/film", authenticateUserJWT(), filmRouter);
adminRouter.use("/analytics", authenticateUserJWT(), analyticRouter);
adminRouter.use("/user", authenticateUserJWT(), userRouter);

export default adminRouter;
