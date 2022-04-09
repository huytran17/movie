import express from "express";
import authenticateUserJWT from "../../middlewares/authenticateUserJWT";

const apiRouter = express.Router();

import authRouter from "./auth";
import userRouter from "./user";
import filmRouter from "./film";

apiRouter.use("/auth", authRouter);
apiRouter.use("/user", authenticateUserJWT(), userRouter);
apiRouter.use("/film", authenticateUserJWT(), filmRouter);

export default apiRouter;
