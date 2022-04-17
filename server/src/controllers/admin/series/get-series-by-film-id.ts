import { Request } from "express";
import * as _ from "lodash";

import { IGetSeriesByFilmId } from "../../../use-cases/series/get-series-by-film-id";

export default function makeGetSeriesByFilmIdController({
  getSeriesByFilmId,
}: {
  getSeriesByFilmId: IGetSeriesByFilmId;
}) {
  return async function getSeriesByFilmIdController(
    httpRequest: Request & { context: { validated: { _id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { film_id }: { film_id: string } = _.get(
        httpRequest,
        "context.validated"
      );

      const series = await getSeriesByFilmId({ id: film_id });

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
