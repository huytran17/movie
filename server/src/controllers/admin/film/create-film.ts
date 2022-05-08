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

      const actors = _.get(filmDetails, "meta.actors", "");
      const actors_array = _.split(actors, ",");

      const tags = _.get(filmDetails, "meta.tags", "");
      const tags_array = _.split(tags, ",");

      const final_film_details = Object.assign({}, filmDetails, {
        "meta.actors": actors_array,
        "meta.tags": tags_array,
      });

      const created_film = await createFilm({
        filmDetails: final_film_details,
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
