import { Request } from "express";
import * as _ from "lodash";
import { IRemoveFilmById } from "../../../use-cases/film/delete-film-by-id";

export default function makeDeleteFilmController({
  deleteFilmById,
}: {
  deleteFilmById: IRemoveFilmById;
}) {
  return async function deleteFilmController(
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

      const film = await deleteFilmById({ id: film_id });

      return {
        headers,
        statusCode: 200,
        body: { data: film }, // TODO: add in implementation of resource
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
