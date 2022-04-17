import _ from "lodash";
import mongoose from "mongoose";
import ISeriesDb, {
  PaginatedSeriesResult,
  IGetSeriesAnalyticsData,
} from "./interfaces/series-db";
import Series from "../entities/series";
import ISeries from "../interfaces/series";

export default function makeSeriesDb({
  seriesDbModel,
  moment,
}: {
  seriesDbModel: mongoose.Model<
    ISeries & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): ISeriesDb {
  return new (class MongooseSeriesDb implements ISeriesDb {
    /**
     * @description used by admin dashboard
     * FIXME: Currently not in used. To be removed and should never be used.
     * @param param0
     * @returns
     */
    async findAll(): Promise<Series[] | null> {
      const query_conditions = { deleted_at: undefined };
      const existing = await seriesDbModel
        .find(query_conditions)
        .populate({
          path: "user",
          select: "-__v",
        })
        .populate({
          path: "film",
          select: "-__v",
        })
        .lean({ virtuals: true });
      if (existing) {
        return existing.map((series) => new Series(series));
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
    }): Promise<PaginatedSeriesResult | null> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = { deleted_at: undefined };

      if (query) {
        Object.defineProperty(query_conditions, "$or", {
          value: [{ email: { $regex: ".*" + query + ".*", $options: "si" } }],
          writable: false,
        });
      }

      const existing = await seriesDbModel
        .find(query_conditions)
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      const total_count = await seriesDbModel.countDocuments(query_conditions);

      if (existing) {
        const data = existing.map((series) => new Series(series));

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

    async findOne(): Promise<Series | null> {
      const existing = await seriesDbModel.findOne().lean({ virtuals: true });

      if (existing) {
        return new Series(existing);
      }

      return null;
    }

    async findById({ id }: { id: string }): Promise<Series | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(id);
      if (!is_mongo_id || !id) {
        return null;
      }

      const existing = await seriesDbModel
        .findById(id)
        .lean({ virtuals: true });

      if (existing) {
        return new Series(existing);
      }
      return null;
    }

    async findByFilmId({ id }: { id: string }): Promise<Series | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(id);
      if (!is_mongo_id || !id) {
        return null;
      }

      const existing = await seriesDbModel
        .findOne({ film: id })
        .lean({ virtuals: true });

      if (existing) {
        return new Series(existing);
      }
      return null;
    }

    async insert(payload: Partial<ISeries>): Promise<Series | null> {
      const updated_payload = payload;

      const result = await seriesDbModel.create([updated_payload]);
      const updated = await seriesDbModel
        .findOne({ _id: result[0]?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new Series(updated);
      }
      return null;
    }

    async delete({ id }: { id: string }): Promise<Series | null> {
      const existing = await seriesDbModel.findOneAndUpdate(
        { _id: id },
        { deleted_at: new Date() }
      );
      const updated = await seriesDbModel
        .findOne({ _id: id })
        .lean({ virtuals: true });
      if (updated) {
        return new Series(updated);
      }
      return null;
    }

    async hardDelete({ id }: { id: string }): Promise<Series | null> {
      const existing = await seriesDbModel.deleteOne({ _id: id });
      const updated = await seriesDbModel
        .findOne({ _id: id })
        .lean({ virtuals: true });
      if (updated) {
        return new Series(updated);
      }
      return null;
    }

    async update(payload: Partial<ISeries>): Promise<Series | null> {
      const result = await seriesDbModel
        .findOneAndUpdate({ _id: payload._id }, payload)
        .lean({ virtuals: true });

      const updated = await seriesDbModel
        .findOne({ _id: result?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new Series(updated);
      }

      return null;
    }
  })();
}
