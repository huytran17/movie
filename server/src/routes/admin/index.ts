import express from "express";
import authenticateUserJWT from "../../middlewares/authenticateUserJWT";

const adminRouter = express.Router();

import authRouter from "./auth";
import filmRouter from "./film";
import analyticRouter from "./analytics";

adminRouter.use("/auth", authRouter);
adminRouter.use("/film", authenticateUserJWT(), filmRouter);
adminRouter.use("/analytics", authenticateUserJWT(), analyticRouter);

export default adminRouter;
