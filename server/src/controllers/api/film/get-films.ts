import _ from "lodash";
import { IGetFilms } from "../../../use-cases/film/get-films";

export default function makeGetFilmsController({
  getFilms,
}: {
  getFilms: IGetFilms;
}) {
  return async function getFilmsController(httpRequest: {
    context: {
      validated: any;
    };
  }) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const {
        categories = "",
        series,
        exclude_ids = "",
        query = "",
        exclude_series = false,
      }: {
        categories: string;
        series: string;
        exclude_ids?: string;
        query?: string;
        exclude_series?: boolean;
      } = _.get(httpRequest, "context.validated");

      const categories_array = categories ? categories.split(",") : [];
      const exclude_ids_array = exclude_ids ? exclude_ids.split(",") : [];

      const films = await getFilms({
        categories: categories_array,
        series,
        exclude_ids: exclude_ids_array,
        query,
        exclude_series,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          data: films,
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
