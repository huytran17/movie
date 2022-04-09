import express from "express";
import authenticateUserJWT from "../../middlewares/adminAuthenticateUserJWT";

const adminRouter = express.Router();

import authRouter from "./auth";
import filmRouter from "./film";
import analyticRouter from "./analytics";
import userRouter from "./user";
import _adminRouter from "./admin";

adminRouter.use("/auth", authRouter);
adminRouter.use("/film", authenticateUserJWT(), filmRouter);
adminRouter.use("/analytics", authenticateUserJWT(), analyticRouter);
adminRouter.use("/user", authenticateUserJWT(), userRouter);
adminRouter.use("/admin", authenticateUserJWT(), _adminRouter);

export default adminRouter;
