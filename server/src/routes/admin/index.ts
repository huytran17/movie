import express from "express";
import authenticateAdminJWT from "../../middlewares/authenticateAdminJWT";

const adminRouter = express.Router();

import authRouter from "./auth";
import filmRouter from "./film";
import analyticRouter from "./analytics";
import userRouter from "./user";
import _adminRouter from "./admin";
import feedbackRouter from "./feedback";
import seriesRouter from "./series";

adminRouter.use("/auth", authRouter);
adminRouter.use("/film", authenticateAdminJWT(), filmRouter);
adminRouter.use("/analytics", authenticateAdminJWT(), analyticRouter);
adminRouter.use("/user", authenticateAdminJWT(), userRouter);
adminRouter.use("/admin", authenticateAdminJWT(), _adminRouter);
adminRouter.use("/feedback", authenticateAdminJWT(), feedbackRouter);
adminRouter.use("/series", authenticateAdminJWT(), seriesRouter);

export default adminRouter;
