import { Request } from "express";
import * as _ from "lodash";
import { IRemoveSeriesById } from "../../../use-cases/series/delete-series-by-id";
import { IGetSeriesById } from "../../../use-cases/series/get-series-by-id";

export default function makeDeleteSeriesController({
  deleteSeriesById,
  getSeriesById,
}: {
  deleteSeriesById: IRemoveSeriesById;
  getSeriesById: IGetSeriesById;
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

      const exists = await getSeriesById({ id: series_id });

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
