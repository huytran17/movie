import mongoose from "mongoose";

import {
  createSeries,
  getSeriesById,
  getSeries,
  updateSeries,
  removeSeriesById,
} from "../../../use-cases/series";
import makeUpdateSeriesController from "./update-series";
import makeGetSeriesController from "./get-series";
import makeDeleteSeriesController from "./delete-series";
import makeCreateSeriesController from "./create-series";
import makeGetSeriesByIdController from "./get-series-by-id";
import makeUploadSeriesThumbnailController from "./upload-series-thumbnail";

const uploadSeriesThumbnailController = makeUploadSeriesThumbnailController({
  updateSeries,
  getSeriesById,
  mongoose,
});
const getSeriesByIdController = makeGetSeriesByIdController({
  getSeriesById,
});

const createSeriesController = makeCreateSeriesController({
  createSeries,
});

const deleteSeriesController = makeDeleteSeriesController({
  deleteSeriesById: removeSeriesById,
  getSeriesById,
});
/**
 * @description update series's details excluding password
 */
const getSeriesController = makeGetSeriesController({ getSeries });

/**
 * @description update series's details excluding password
 */
const updateSeriesController = makeUpdateSeriesController({
  updateSeries,
  getSeriesById,
  mongoose,
});

export default Object.freeze({
  updateSeriesController,
  getSeriesController,
  deleteSeriesController,
  createSeriesController,
  getSeriesByIdController,
  uploadSeriesThumbnailController,
});

export {
  updateSeriesController,
  getSeriesController,
  deleteSeriesController,
  createSeriesController,
  getSeriesByIdController,
  uploadSeriesThumbnailController,
};
