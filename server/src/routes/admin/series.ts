import express from "express";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";

import {
  deleteSeriesRules,
  updateSeriesRules,
  createSeriesRules,
  getSeriesByIdRules,
  uploadSeriesThumbnailRules,
} from "../../controllers/admin/series/validators";
import {
  getSeriesByIdController,
  updateSeriesController,
  getSeriesController,
  deleteSeriesController,
  createSeriesController,
  uploadSeriesThumbnailController,
} from "../../controllers/admin/series";
import { upload } from "../../middlewares/file-upload-middleware";

const seriesRouter = express.Router();

seriesRouter.post(
  "/upload-thumbnail/:series_id",
  upload.single("file"),
  makeValidator(uploadSeriesThumbnailRules),
  makeExpressCallback(uploadSeriesThumbnailController)
);

seriesRouter.get(
  "/:series_id",
  makeValidator(getSeriesByIdRules),
  makeExpressCallback(getSeriesByIdController)
);

seriesRouter.get("/", makeExpressCallback(getSeriesController));

seriesRouter.put(
  "/:series_id",
  makeValidator(updateSeriesRules),
  makeExpressCallback(updateSeriesController)
);

seriesRouter.delete(
  "/delete/:series_id",
  makeValidator(deleteSeriesRules),
  makeExpressCallback(deleteSeriesController)
);

seriesRouter.post(
  "/create-series",
  makeValidator(createSeriesRules),
  makeExpressCallback(createSeriesController)
);

export default seriesRouter;
