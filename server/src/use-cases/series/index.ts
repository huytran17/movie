import { SeriesDb } from "../../data-access";

import makeCreateSeries from "./create-series";
import makeUpdateSeries from "./update-series";
import makeGetSeriesById from "./get-series-by-id";
import makeRemoveSeriesById from "./delete-series-by-id";
import makeGetSeries from "./get-series";
import makeGetSeriesPaginated from "./get-series-paginated";

const createSeries = makeCreateSeries(SeriesDb);
const getSeriesPaginated = makeGetSeriesPaginated(SeriesDb);
const updateSeries = makeUpdateSeries(SeriesDb);
const removeSeriesById = makeRemoveSeriesById(SeriesDb);

/**
 * get film by _id
 * @function getSeriesById
 */
const getSeriesById = makeGetSeriesById(SeriesDb);

/**
 * used by admin dashboard to get films
 * TODO: this logic to get films is flawed. It should be server side search
 */
const getSeries = makeGetSeries(SeriesDb);

const filmServices = Object.freeze({
  createSeries,
  getSeriesById,
  getSeries,
  updateSeries,
  removeSeriesById,
  getSeriesPaginated,
});

export default filmServices;
export {
  createSeries,
  getSeriesById,
  getSeries,
  updateSeries,
  removeSeriesById,
  getSeriesPaginated,
};
