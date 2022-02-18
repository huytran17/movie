import express from "express";

const apiRouter = express.Router();

import authRouter from "./auth";

apiRouter.use("/auth", authRouter);

export default apiRouter;
