import { Request } from "express";
import { Mongoose } from "mongoose";
import * as _ from "lodash";

import { IUpdateFilm } from "../../../use-cases/film/update-film";
import IFilm from "../../../interfaces/film";
import { IGetFilmById } from "../../../use-cases/film/get-film-by-id";

export default function makeUpdateFilmController({
  updateFilm,
  getFilmById,
  mongoose,
}: {
  updateFilm: IUpdateFilm;
  getFilmById: IGetFilmById;
  mongoose: Mongoose;
}) {
  return async function updateFilmController(
    httpRequest: Request & { context: { validated: { filmDetails: IFilm } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const filmDetails: IFilm = _.get(httpRequest, "context.validated.data");

      const { _id } = filmDetails; // the film's ID
      const exists = await getFilmById({ id: _id });
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

      const actors = _.get(filmDetails, "meta.actors", "");
      const actors_array = _.split(actors, ",");

      const tags = _.get(filmDetails, "meta.tags", "");
      const tags_array = _.split(tags, ",");

      const final_film_details = Object.assign({}, filmDetails, {
        "meta.actors": actors_array,
        "meta.tags": tags_array,
      });

      const updatedFilm = await updateFilm({
        filmDetails: final_film_details,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          data: updatedFilm,
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
