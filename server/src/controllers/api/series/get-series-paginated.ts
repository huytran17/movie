import _ from "lodash";
import { IGetSeriesPaginated } from "../../../use-cases/series/get-series-paginated";

export default function makeGetSeriesPaginatedController({
  getSeriesPaginated,
}: {
  getSeriesPaginated: IGetSeriesPaginated;
}) {
  return async function getSeriesPaginatedController(httpRequest: {
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
      }: {
        query: string;
        page: number;
        entries_per_page: number;
      } = _.get(httpRequest, "context.validated");

      const series_paginated = await getSeriesPaginated({
        query,
        page: Number(page),
        entries_per_page: Number(entries_per_page),
      });

      return {
        headers,
        statusCode: 200,
        body: {
          ...series_paginated,
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
