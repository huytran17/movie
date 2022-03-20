import { Request } from "express";
import * as _ from "lodash";

import { IGetFilmByName } from "../../../use-cases/film/get-film-by-name";

export default function makeGetFilmByNameController({
  getFilmByName,
}: {
  getFilmByName: IGetFilmByName;
}) {
  return async function getFilmByNameController(
    httpRequest: Request & { context: { validated: { _id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { film_name }: { film_name: string } = _.get(
        httpRequest,
        "context.validated"
      );

      const film = await getFilmByName({ film_name });

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
