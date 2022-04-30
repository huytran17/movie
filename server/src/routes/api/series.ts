import express from "express";
import makeExpressCallback from "../../express-callback";

import { getSeriesController } from "../../controllers/api/series";

const seriesRouter = express.Router();

seriesRouter.get("/", makeExpressCallback(getSeriesController));

export default seriesRouter;
