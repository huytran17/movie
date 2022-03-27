import { Request } from "express";
import * as _ from "lodash";

import { IGetFilmByTitle } from "../../../use-cases/film/get-film-by-title";

export default function makeGetFilmByTitleController({
  getFilmByTitle,
}: {
  getFilmByTitle: IGetFilmByTitle;
}) {
  return async function getFilmByTitleController(
    httpRequest: Request & { context: { validated: { _id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { title }: { title: string } = _.get(
        httpRequest,
        "context.validated"
      );

      const film = await getFilmByTitle({ title });

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
