import _ from "lodash";
import { IGetAdminAnalytics } from "../../../use-cases/analytics/get-admin-analytics";

export default function makeGetAdminAnalyticsController({
  getAdminAnalytics,
}: {
  getAdminAnalytics: IGetAdminAnalytics;
}) {
  return async function getAdminAnalyticsController(httpRequest: {
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

      const admin_analytics = await getAdminAnalytics({ unit, distance });

      return {
        headers,
        statusCode: 200,
        body: { data: admin_analytics },
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
