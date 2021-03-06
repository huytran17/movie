import express from "express";
import authenticateUserJWT from "../../middlewares/authenticateUserJWT";

const apiRouter = express.Router();

import authRouter from "./auth";
import userRouter from "./user";
import filmRouter from "./film";
import commentRouter from "./comment";
import seriesRouter from "./series";
import feedbackRouter from "./feedback";
import commentAssetRouter from "./comment-asset";

apiRouter.use("/auth", authRouter);
apiRouter.use("/user", authenticateUserJWT(), userRouter);
apiRouter.use("/film", authenticateUserJWT(), filmRouter);
apiRouter.use("/comment", authenticateUserJWT(), commentRouter);
apiRouter.use("/feedback", authenticateUserJWT(), feedbackRouter);
apiRouter.use("/series", authenticateUserJWT(), seriesRouter);
apiRouter.use("/comment-asset", authenticateUserJWT(), commentAssetRouter);

export default apiRouter;
