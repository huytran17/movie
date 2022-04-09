import IFilm, {
  IGetAdminAnalyticsData,
} from "../../data-access/interfaces/admin-db";

export type IGetAdminAnalytics = ({
  distance,
  unit,
}: {
  distance?: number;
  unit?: string;
}) => Promise<IGetAdminAnalyticsData | null>;

export default function makeGetAdminAnalytics({
  adminDb,
}: {
  adminDb: IFilm;
}): IGetAdminAnalytics {
  return async function getAdminAnalytics({
    distance,
    unit,
  }: {
    distance?: number;
    unit?: string;
  }): Promise<IGetAdminAnalyticsData | null> {
    const admin_analytic_data = await adminDb.aggregateAdminCount({
      distance,
      unit,
    });

    return admin_analytic_data;
  };
}
