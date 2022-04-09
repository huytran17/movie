import _ from "lodash";
import mongoose from "mongoose";
import IUserDb, {
  PaginatedUserResult,
  IGetUserAnalyticsData,
} from "./interfaces/user-db";
import User from "../entities/user";
import IUser from "../interfaces/user";

export default function makeUserDb({
  userDbModel,
  moment,
}: {
  userDbModel: mongoose.Model<
    IUser & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): IUserDb {
  return new (class MongooseUserDb implements IUserDb {
    /**
     * get the number of resumes daily for past "distance & unit" (including today)
     * @param param0
     * @returns
     */
    async aggregateUserCount({
      distance = 6,
      unit = "day",
    }: {
      distance?: number;
      unit?: string;
    }): Promise<IGetUserAnalyticsData> {
      const from_date_formatted = moment().subtract(distance, unit);
      const to_date_formatted = moment();
      const formatted_dates = [];
      const counts = [];
      const total_cumulative_counts = [];

      const query_conditions = { deleted_at: undefined };

      const users = await userDbModel.find(query_conditions);

      while (from_date_formatted.isSameOrBefore(to_date_formatted, unit)) {
        const date = from_date_formatted.format("YYYY-MM-DD");
        formatted_dates.push(date);

        const [total_cumulative_count, total_count] = await Promise.all([
          userDbModel.countDocuments({
            ...query_conditions,
            created_at: {
              $lte: moment(from_date_formatted, "yyyy-MM-DD").endOf(unit),
            },
          }),
          userDbModel.countDocuments({
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
    /**
     * @description used by admin dashboard
     * FIXME: Currently not in used. To be removed and should never be used.
     * @param param0
     * @returns
     */
    async findAll(): Promise<User[] | null> {
      const existing = await userDbModel.find().lean({ virtuals: true });
      if (existing) {
        return existing.map((user) => new User(user));
      }

      return null;
    }

    /**
     *
     * @description used by admin API
     * @param param0
     * @param param1
     */
    async findAllPaginated({
      query = "",
      page = 1,
      entries_per_page = 15,
    }: {
      query: string;
      page: number;
      entries_per_page?: number;
    }): Promise<PaginatedUserResult | null> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = { deleted_at: undefined };

      if (query) {
        Object.defineProperty(query_conditions, "$or", {
          value: [{ email: { $regex: ".*" + query + ".*", $options: "si" } }],
          writable: false,
        });
      }

      const existing = await userDbModel
        .find(query_conditions)
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      const total_count = await userDbModel.countDocuments(query_conditions);

      if (existing) {
        const data = existing.map((user) => new User(user));

        const from = page - 1 > 0 ? page - 1 : null;
        const has_more_entries =
          existing.length === entries_per_page &&
          page * entries_per_page !== total_count;
        const to = has_more_entries ? page + 1 : null;
        const total_pages = Math.ceil(total_count / entries_per_page);

        return {
          data,
          pagination: {
            current_page: page,
            from,
            to,
            per_page: entries_per_page,
            total: total_count,
            total_pages,
          },
        };
      }

      return null;
    }

    async findOne(): Promise<User | null> {
      const existing = await userDbModel.findOne().lean({ virtuals: true });

      if (existing) {
        return new User(existing);
      }

      return null;
    }

    async findById({ id }: { id: string }): Promise<User | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(id);
      if (!is_mongo_id || !id) {
        return null;
      }

      const existing = await userDbModel.findById(id).lean({ virtuals: true });

      if (existing) {
        return new User(existing);
      }
      return null;
    }

    /**
     * finding one user by slug
     * @param param0
     * @param options
     * @returns
     */
    async findBySlug({ slug }: { slug: string }): Promise<User | null> {
      const existing = await userDbModel
        .findOne({ slug })
        .lean({ virtuals: true });

      if (existing) {
        return new User(existing);
      }
      return null;
    }

    /**
     * finding one user by slug
     * @param param0
     * @param options
     * @returns
     */
    async findByUsername({
      username,
    }: {
      username: string;
    }): Promise<User | null> {
      const existing = await userDbModel
        .findOne({ username })
        .lean({ virtuals: true });

      if (existing) {
        return new User(existing);
      }
      return null;
    }

    async findByEmail({ email }: { email: string }): Promise<User | null> {
      const query_conditions = {
        email,
        deleted_at: undefined,
      };
      const existing = await userDbModel.findOne(query_conditions);

      if (existing) {
        return new User(existing);
      }
      return null;
    }

    async insert(payload: Partial<IUser>): Promise<User | null> {
      const updated_payload = payload;

      const result = await userDbModel.create([updated_payload]);
      const updated = await userDbModel
        .findOne({ _id: result[0]?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new User(updated);
      }
      return null;
    }

    async deleteByEmail({ email }: { email: string }): Promise<User | null> {
      const existing = await userDbModel.findOneAndUpdate(
        { email },
        { deleted_at: new Date() }
      );

      const updated = await userDbModel
        .findOne({ email })
        .lean({ virtuals: true });
      if (updated) {
        return new User(updated);
      }
      return null;
    }

    async delete({ id }: { id: string }): Promise<User | null> {
      const existing = await userDbModel.findOneAndUpdate(
        { _id: id },
        { deleted_at: new Date() }
      );
      const updated = await userDbModel
        .findOne({ _id: id })
        .lean({ virtuals: true });
      if (updated) {
        return new User(updated);
      }
      return null;
    }

    async hardDeleteByEmail({
      email,
    }: {
      email: string;
    }): Promise<User | null> {
      const existing = await userDbModel.deleteOne({ email });

      const updated = await userDbModel
        .findOne({ email })
        .lean({ virtuals: true });
      if (updated) {
        return new User(updated);
      }
      return null;
    }

    async hardDelete({ id }: { id: string }): Promise<User | null> {
      const existing = await userDbModel.deleteOne({ _id: id });
      const updated = await userDbModel
        .findOne({ _id: id })
        .lean({ virtuals: true });
      if (updated) {
        return new User(updated);
      }
      return null;
    }

    async update(payload: Partial<IUser>): Promise<User | null> {
      const result = await userDbModel
        .findOneAndUpdate({ _id: payload._id }, payload)
        .lean({ virtuals: true });

      const updated = await userDbModel
        .findOne({ _id: result?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new User(updated);
      }

      return null;
    }
  })();
}
