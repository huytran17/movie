import mongoose from "mongoose";

import { getSeries, getSeriesPaginated } from "../../../use-cases/series";
import makeGetSeriesController from "./get-series";
import makeGetSeriesPaginatedController from "./get-series-paginated";

/**
 * @description update series's details excluding password
 */
const getSeriesController = makeGetSeriesController({ getSeries });

const getSeriesPaginatedController = makeGetSeriesPaginatedController({
  getSeriesPaginated,
});

export default Object.freeze({
  getSeriesController,
  getSeriesPaginatedController,
});

export { getSeriesController, getSeriesPaginatedController };
