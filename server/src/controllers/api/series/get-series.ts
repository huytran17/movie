import { Request } from "express";
import * as _ from "lodash";
import { IGetSeries } from "../../../use-cases/series/get-series";

export default function makeGetSeriesController({
  getSeries,
}: {
  getSeries: IGetSeries;
}) {
  return async function getSeriesController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const series = await getSeries();

      return {
        headers,
        statusCode: 200,
        body: { data: series }, // TODO: add in implementation of resource
      };
    } catch (err) {
      // TODO: add in error handling here
      throw {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 404,
        body: {
          error: err.message,
        },
      };
    }
  };
}
