import { Request } from "express";
import * as _ from "lodash";
import Film from "../../../entities/film";

import { ICreateFilm } from "../../../use-cases/film/create-film";

export default function makeCreateFilmController({
  createFilm,
}: {
  createFilm: ICreateFilm;
}) {
  return async function createFilmController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const filmDetails: Film = _.get(httpRequest, "context.validated.data");

      const created_film = await createFilm({
        filmDetails,
      });

      return {
        headers,
        statusCode: 201,
        body: {
          data: created_film,
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
