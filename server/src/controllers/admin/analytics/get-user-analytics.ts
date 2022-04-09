import _ from "lodash";
import { IGetUserAnalytics } from "../../../use-cases/analytics/get-user-analytics";

export default function makeGetUserAnalyticsController({
  getUserAnalytics,
}: {
  getUserAnalytics: IGetUserAnalytics;
}) {
  return async function getUserAnalyticsController(httpRequest: {
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

      const user_analytics = await getUserAnalytics({ unit, distance });

      return {
        headers,
        statusCode: 200,
        body: { data: user_analytics },
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
