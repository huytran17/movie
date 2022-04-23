import { Request } from "express";
import * as _ from "lodash";

import { IGetFilmBySlug } from "../../../use-cases/film/get-film-by-slug";
import { IGetFilmById } from "../../../use-cases/film/get-film-by-id";

export default function makeGetFilmBySlugController({
  getFilmById,
  getFilmBySlug,
}: {
  getFilmById: IGetFilmById;
  getFilmBySlug: IGetFilmBySlug;
}) {
  return async function getFilmBySlugController(
    httpRequest: Request & { context: { validated: { _id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { slug }: { slug: string } = _.get(
        httpRequest,
        "context.validated"
      );

      const [film_by_id_exists, film_by_slug_exists] = await Promise.all([
        getFilmById({ id: slug }),
        getFilmBySlug({ slug: slug }),
      ]);

      const film_exists = film_by_id_exists || film_by_slug_exists;
      if (!film_exists) {
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
        body: { data: film_exists }, // TODO: add in implementation of resource
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
