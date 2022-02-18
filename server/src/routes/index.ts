import express from "express";
import apiRouter from "./api";

const appRouter = express.Router();

appRouter.use("/api", apiRouter);

export default appRouter;
