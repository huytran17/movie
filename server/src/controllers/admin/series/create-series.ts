import { Request } from "express";
import * as _ from "lodash";
import Series from "../../../entities/series";

import { ICreateSeries } from "../../../use-cases/series/create-series";

export default function makeCreateSeriesController({
  createSeries,
}: {
  createSeries: ICreateSeries;
}) {
  return async function createSeriesController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const seriesDetails: Series = _.get(
        httpRequest,
        "context.validated.data"
      );

      const { user, film } = _.get(httpRequest, "context.validated");

      const final_series_data = Object.assign({}, seriesDetails, {
        user,
        film,
      });

      const created_series = await createSeries({
        seriesDetails: final_series_data,
      });

      return {
        headers,
        statusCode: 201,
        body: {
          is_error: false,
          data: created_series,
        },
      };
    } catch (err) {
      // TODO: add in error handling here
      return {
        headers,
        statusCode: 201,
        body: {
          error: err.message,
        },
      };
    }
  };
}
