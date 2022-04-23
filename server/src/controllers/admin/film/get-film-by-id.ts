import { Request } from "express";
import * as _ from "lodash";

import { IGetFilmById } from "../../../use-cases/film/get-film-by-id";

export default function makeGetFilmByFilmnameController({
  getFilmById,
}: {
  getFilmById: IGetFilmById;
}) {
  return async function getFilmByFilmnameController(
    httpRequest: Request & { context: { validated: { _id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { id }: { id: string } = _.get(httpRequest, "context.validated");

      const exists = await getFilmById({ id });

      if (!exists) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: `Film does not exists.`,
          },
        };
      }

      return {
        headers,
        statusCode: 200,
        body: { data: exists }, // TODO: add in implementation of resource
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
