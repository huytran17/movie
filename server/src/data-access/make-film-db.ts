import _ from "lodash";
import mongoose from "mongoose";
import IFilmDb, { PaginatedFilmResult } from "./interfaces/film-db";
import Film from "../entities/film";
import IFilm from "../interfaces/film";

export default function makeFilmDb({
  filmDbModel,
  moment,
}: {
  filmDbModel: mongoose.Model<
    IFilm & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): IFilmDb {
  return new (class MongooseFilmDb implements IFilmDb {
    /**
     * @description used by admin dashboard
     * FIXME: Currently not in used. To be removed and should never be used.
     * @param param0
     * @returns
     */
    async findAll(): Promise<Film[] | null> {
      const existing = await filmDbModel
        .find()
        .limit(2000)
        .lean({ virtuals: true });
      if (existing) {
        return existing.map((film) => new Film(film));
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
    }): Promise<PaginatedFilmResult | null> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = { deleted_at: undefined };

      if (query) {
        Object.defineProperty(query_conditions, "$or", {
          value: [{ email: { $regex: ".*" + query + ".*", $options: "si" } }],
          writable: false,
        });
      }

      const existing = await filmDbModel
        .find(query_conditions)
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      const total_count = await filmDbModel.countDocuments(query_conditions);

      if (existing) {
        const data = existing.map((film) => new Film(film));

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

    async findOne(): Promise<Film | null> {
      const existing = await filmDbModel.findOne().lean({ virtuals: true });

      if (existing) {
        return new Film(existing);
      }

      return null;
    }

    async findById({ id }: { id: string }): Promise<Film | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(id);
      if (!is_mongo_id || !id) {
        return null;
      }

      const existing = await filmDbModel.findById(id).lean({ virtuals: true });

      if (existing) {
        return new Film(existing);
      }
      return null;
    }

    /**
     * finding one film by slug
     * @param param0
     * @param options
     * @returns
     */
    async findBySlug({ slug }: { slug: string }): Promise<Film | null> {
      const existing = await filmDbModel
        .findOne({ slug })
        .lean({ virtuals: true });

      if (existing) {
        return new Film(existing);
      }
      return null;
    }

    /**
     * finding one film by slug
     * @param param0
     * @param options
     * @returns
     */
    async findByFilmName({
      film_name,
    }: {
      film_name: string;
    }): Promise<Film | null> {
      const existing = await filmDbModel
        .findOne({ film_name })
        .lean({ virtuals: true });

      if (existing) {
        return new Film(existing);
      }
      return null;
    }

    async insert(payload: Partial<IFilm>): Promise<Film | null> {
      const updated_payload = payload;

      const result = await filmDbModel.create([updated_payload]);
      const updated = await filmDbModel
        .findOne({ _id: result[0]?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new Film(updated);
      }
      return null;
    }

    async delete({ id }: { id: string }): Promise<Film | null> {
      const existing = await filmDbModel.findOneAndUpdate(
        { _id: id },
        { deleted_at: new Date() }
      );
      const updated = await filmDbModel
        .findOne({ _id: id })
        .lean({ virtuals: true });
      if (updated) {
        return new Film(updated);
      }
      return null;
    }

    async hardDelete({ id }: { id: string }): Promise<Film | null> {
      const existing = await filmDbModel.deleteOne({ _id: id });
      const updated = await filmDbModel
        .findOne({ _id: id })
        .lean({ virtuals: true });
      if (updated) {
        return new Film(updated);
      }
      return null;
    }

    async update(payload: Partial<IFilm>): Promise<Film | null> {
      const result = await filmDbModel
        .findOneAndUpdate({ _id: payload._id }, payload)
        .lean({ virtuals: true });

      const updated = await filmDbModel
        .findOne({ _id: result?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new Film(updated);
      }

      return null;
    }
  })();
}
