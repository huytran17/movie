import { Request } from "express";
import * as _ from "lodash";
import { IGetFilmsPaginated } from "../../../use-cases/film/get-films-paginated";

export default function makeGetFilmsController({
  getFilmsPaginated,
}: {
  getFilmsPaginated: IGetFilmsPaginated;
}) {
  return async function getFilmsController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const {
        query,
        page = 1,
        entries_per_page = 15,
        category = "",
        series = "",
        exclude_ids = "",
      }: {
        query: string;
        page: number;
        entries_per_page: number;
        category: string;
        series: string;
        exclude_ids?: string;
      } = _.get(httpRequest, "context.validated");
      const films_paginated = await getFilmsPaginated({
        query,
        page,
        entries_per_page,
        category,
        series,
        exclude_ids,
      });

      return {
        headers,
        statusCode: 200,
        body: { ...films_paginated }, // TODO: add in implementation of resource
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
