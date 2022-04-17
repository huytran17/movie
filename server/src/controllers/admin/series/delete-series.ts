import { Request } from "express";
import * as _ from "lodash";
import { IRemoveSeriesById } from "../../../use-cases/series/delete-series-by-id";

export default function makeDeleteSeriesController({
  deleteSeriesById,
}: {
  deleteSeriesById: IRemoveSeriesById;
}) {
  return async function deleteSeriesController(
    httpRequest: Request & { context: { validated: { _id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { series_id }: { series_id: string } = _.get(
        httpRequest,
        "context.validated"
      );

      const series = await deleteSeriesById({ id: series_id });

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
