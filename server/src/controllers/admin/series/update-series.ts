import { Request } from "express";
import { Mongoose } from "mongoose";
import * as _ from "lodash";

import { IUpdateSeries } from "../../../use-cases/series/update-series";
import ISeries from "../../../interfaces/series";
import { IGetSeriesById } from "../../../use-cases/series/get-series-by-id";

export default function makeUpdateSeriesController({
  updateSeries,
  getSeriesById,
  mongoose,
}: {
  updateSeries: IUpdateSeries;
  getSeriesById: IGetSeriesById;
  mongoose: Mongoose;
}) {
  return async function updateSeriesController(
    httpRequest: Request & {
      context: { validated: { seriesDetails: ISeries } };
    }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const seriesDetails: ISeries = _.get(
        httpRequest,
        "context.validated.data"
      );

      const { _id } = seriesDetails; // the series's ID
      const exists = await getSeriesById({ id: _id });
      if (!exists) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: `Series does not exists.`,
          },
        };
      }

      const updatedSeries = await updateSeries({
        seriesDetails,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          data: updatedSeries,
        }, // TODO: add in implementation of resource
      };
    } catch (err) {
      // TODO: add in error handling here
      // await session.abortTransaction();
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
