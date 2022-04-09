import IUser, {
  IGetUserAnalyticsData,
} from "../../data-access/interfaces/user-db";

export type IGetUserAnalytics = ({
  distance,
  unit,
}: {
  distance?: number;
  unit?: string;
}) => Promise<IGetUserAnalyticsData | null>;

export default function makeGetUserAnalytics({
  userDb,
}: {
  userDb: IUser;
}): IGetUserAnalytics {
  return async function getUserAnalytics({
    distance,
    unit,
  }: {
    distance?: number;
    unit?: string;
  }): Promise<IGetUserAnalyticsData | null> {
    const user_analytic_data = await userDb.aggregateUserCount({
      distance,
      unit,
    });

    return user_analytic_data;
  };
}
