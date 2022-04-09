import _ from "lodash";
import { IGetFilmAnalytics } from "../../../use-cases/analytics/get-film-analytics";

export default function makeGetFilmAnalyticsController({
  getFilmAnalytics,
}: {
  getFilmAnalytics: IGetFilmAnalytics;
}) {
  return async function getFilmAnalyticsController(httpRequest: {
    context: {
      validated: null;
    };
  }) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { unit, distance }: { unit: string; distance: number } = _.get(
        httpRequest,
        "context.validated"
      );

      const film_analytics = await getFilmAnalytics({ unit, distance });

      return {
        headers,
        statusCode: 200,
        body: { data: film_analytics },
      };
    } catch (err) {
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
