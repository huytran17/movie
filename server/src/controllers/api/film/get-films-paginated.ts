import _ from "lodash";
import { IGetFilmsPaginated } from "../../../use-cases/film/get-films-paginated";

export default function makeGetFilmsPaginatedController({
  getFilmsPaginated,
}: {
  getFilmsPaginated: IGetFilmsPaginated;
}) {
  return async function getFilmsPaginatedController(httpRequest: {
    context: {
      validated: any;
    };
  }) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const {
        query,
        page = 1,
        entries_per_page = 15,
        category = "",
        series,
      }: {
        query: string;
        page: number;
        entries_per_page: number;
        category: string;
        series: string;
      } = _.get(httpRequest, "context.validated");

      const films_paginated = await getFilmsPaginated({
        query,
        page: Number(page),
        entries_per_page: Number(entries_per_page),
        category,
        series,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          ...films_paginated,
        },
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
