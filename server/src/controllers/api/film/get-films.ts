import { Request } from "express";
import * as _ from "lodash";
import { IGetFilms } from "../../../use-cases/film/get-films";

export default function makeGetFilmsController({
  getFilms,
}: {
  getFilms: IGetFilms;
}) {
  return async function getFilmsController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const films = await getFilms();

      return {
        headers,
        statusCode: 200,
        body: { data: films }, // TODO: add in implementation of resource
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
