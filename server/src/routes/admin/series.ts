import express from "express";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";

import {
  deleteSeriesRules,
  updateSeriesRules,
  createSeriesRules,
  getSeriesByIdRules,
  getSeriesByFilmIdRules,
} from "../../controllers/admin/series/validators";
import {
  getSeriesByIdController,
  getSeriesByFilmIdController,
  updateSeriesController,
  getSeriesController,
  deleteSeriesController,
  createSeriesController,
} from "../../controllers/admin/series";

const seriesRouter = express.Router();

seriesRouter.get(
  "/:series_id",
  makeValidator(getSeriesByIdRules),
  makeExpressCallback(getSeriesByIdController)
);

seriesRouter.get(
  "/:film_id",
  makeValidator(getSeriesByFilmIdRules),
  makeExpressCallback(getSeriesByFilmIdController)
);

seriesRouter.get("/", makeExpressCallback(getSeriesController));

seriesRouter.put(
  "/update-series",
  makeValidator(updateSeriesRules),
  makeExpressCallback(updateSeriesController)
);

seriesRouter.delete(
  "/delete/:series_id",
  makeValidator(deleteSeriesRules),
  makeExpressCallback(deleteSeriesController)
);

seriesRouter.post(
  "/create-series/:film",
  makeValidator(createSeriesRules),
  makeExpressCallback(createSeriesController)
);

export default seriesRouter;
