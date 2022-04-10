import express from "express";
import authenticateUserJWT from "../../middlewares/authenticateUserJWT";

const apiRouter = express.Router();

import authRouter from "./auth";
import userRouter from "./user";
import filmRouter from "./film";
import commentRouter from "./comment";

apiRouter.use("/auth", authRouter);
apiRouter.use("/user", authenticateUserJWT(), userRouter);
apiRouter.use("/film", authenticateUserJWT(), filmRouter);
apiRouter.use("/comment", authenticateUserJWT(), commentRouter);

export default apiRouter;
