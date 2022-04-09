import mongoose from "mongoose";

import IAdminDb, { IGetAdminAnalyticsData } from "./interfaces/admin-db";
import IAdmin from "../interfaces/admin";
import Admin from "../entities/admin";

export default function makeAdminDb({
  adminDbModel,
  moment,
}: {
  adminDbModel: mongoose.Model<
    IAdmin & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): IAdminDb {
  return new (class MongooseAdminDb implements IAdminDb {
    /**
     * @description used by admin dashboard
     * FIXME: Currently not in used. To be removed and should never be used.
     * @param param0
     * @returns
     */
    async findAll(): Promise<Admin[] | null> {
      const query_conditions = { deleted_at: undefined };

      const existing = await adminDbModel
        .find(query_conditions)
        .lean({ virtuals: true });
      if (existing) {
        return existing.map((user) => new Admin(user));
      }

      return null;
    }

    async findOne(): Promise<Admin | null> {
      const existing = await adminDbModel.findOne().lean({ virtuals: true });

      if (existing) {
        return new Admin(existing);
      }

      return null;
    }

    async insert(payload: Partial<IAdmin>): Promise<Admin | null> {
      const updated_payload = payload;

      const result = await adminDbModel.create([updated_payload]);
      const updated = await adminDbModel
        .findOne({ _id: result[0]?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new Admin(updated);
      }
      return null;
    }

    async findById({ id }: { id: string }): Promise<Admin | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(id);
      if (!is_mongo_id || !id) {
        return null;
      }

      const existing = await adminDbModel.findById(id).lean({ virtuals: true });

      if (existing) {
        return new Admin(existing);
      }
      return null;
    }

    /**
     * get the number of resumes daily for past "distance & unit" (including today)
     * @param param0
     * @returns
     */
    async aggregateAdminCount({
      distance = 6,
      unit = "day",
    }: {
      distance?: number;
      unit?: string;
    }): Promise<IGetAdminAnalyticsData> {
      const from_date_formatted = moment().subtract(distance, unit);
      const to_date_formatted = moment();
      const formatted_dates = [];
      const counts = [];
      const total_cumulative_counts = [];

      const query_conditions = { deleted_at: undefined };

      while (from_date_formatted.isSameOrBefore(to_date_formatted, unit)) {
        const date = from_date_formatted.format("YYYY-MM-DD");
        formatted_dates.push(date);

        const [total_cumulative_count, total_count] = await Promise.all([
          adminDbModel.countDocuments({
            ...query_conditions,
            created_at: {
              $lte: moment(from_date_formatted, "yyyy-MM-DD").endOf(unit),
            },
          }),
          adminDbModel.countDocuments({
            ...query_conditions,
            created_at: {
              $gte: moment(from_date_formatted, "yyyy-MM-DD").startOf(unit),
              $lte: moment(from_date_formatted, "yyyy-MM-DD").endOf(unit),
            },
          }),
        ]);

        counts.push(total_count);
        total_cumulative_counts.push(total_cumulative_count);
        from_date_formatted.add(1, unit);
      }
      return {
        formatted_dates,
        counts,
        total_cumulative_counts,
      };
    }
  })();
}
