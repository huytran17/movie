import mongoose from "mongoose";

import { getSeries } from "../../../use-cases/series";
import makeGetSeriesController from "./get-series";

/**
 * @description update series's details excluding password
 */
const getSeriesController = makeGetSeriesController({ getSeries });

export default Object.freeze({
  getSeriesController,
});

export { getSeriesController };
