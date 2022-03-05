import express from "express";
import authenticateUserJWT from "../../middlewares/authenticateUserJWT";

const apiRouter = express.Router();

import authRouter from "./auth";
import userRouter from "./user";

apiRouter.use("/auth", authRouter);
apiRouter.use("/user", authenticateUserJWT(), userRouter);

export default apiRouter;
