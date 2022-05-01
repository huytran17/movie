import express from "express";
import makeExpressCallback from "../../express-callback";

import {
  getSeriesController,
  getSeriesPaginatedController,
} from "../../controllers/api/series";

const seriesRouter = express.Router();

seriesRouter.get("/", makeExpressCallback(getSeriesController));

seriesRouter.get(
  "/all-paginated",
  makeExpressCallback(getSeriesPaginatedController)
);

export default seriesRouter;
