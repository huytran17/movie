import mongoose from "mongoose";

import {
  createSeries,
  getSeriesById,
  getSeries,
  updateSeries,
  removeSeriesById,
  getSeriesByFilmId,
} from "../../../use-cases/series";
import makeUpdateSeriesController from "./update-series";
import makeGetSeriesController from "./get-series";
import makeDeleteSeriesController from "./delete-series";
import makeCreateSeriesController from "./create-series";
import makeGetSeriesByIdController from "./get-series-by-id";
import makeGetSeriesByFilmId from "./get-series-by-film-id";

const getSeriesByIdController = makeGetSeriesByIdController({
  getSeriesById,
});

const getSeriesByFilmIdController = makeGetSeriesByFilmId({
  getSeriesByFilmId,
});

const createSeriesController = makeCreateSeriesController({
  createSeries,
});

const deleteSeriesController = makeDeleteSeriesController({
  deleteSeriesById: removeSeriesById,
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
  getSeriesByFilmIdController,
});

export {
  updateSeriesController,
  getSeriesController,
  deleteSeriesController,
  createSeriesController,
  getSeriesByIdController,
  getSeriesByFilmIdController,
};
