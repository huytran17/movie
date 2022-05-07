import _ from "lodash";
import mongoose from "mongoose";
import ICommentAssetDb, {
  PaginatedCommentAssetResult,
  ICommentAssetData,
} from "./interfaces/comment-asset-db";
import CommentAsset from "../entities/comment-asset";
import ICommentAsset from "../interfaces/comment-asset";

export default function makeCommentAssetDb({
  commentAssetDbModel,
  moment,
}: {
  commentAssetDbModel: mongoose.Model<
    ICommentAsset & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): ICommentAssetDb {
  return new (class MongooseCommentAssetDb implements ICommentAssetDb {
    /**
     * @description used by admin dashboard
     * FIXME: Currently not in used. To be removed and should never be used.
     * @param param0
     * @returns
     */
    async findAll(): Promise<CommentAsset[] | null> {
      const query_conditions = { deleted_at: undefined };
      const existing = await commentAssetDbModel
        .find(query_conditions)
        .populate([
          {
            path: "film",
            populate: [
              {
                path: "user",
              },
            ],
          },
          {
            path: "parent",
            populate: [
              {
                path: "film",
              },
              {
                path: "user",
              },
            ],
          },
          {
            path: "children",
            populate: [
              {
                path: "film",
              },
              {
                path: "user",
              },
            ],
          },
        ])
        .lean({ virtuals: true });
      if (existing) {
        return existing.map((comment_asset) => new CommentAsset(comment_asset));
      }

      return null;
    }

    async findByFilmId({
      film_id,
    }: {
      film_id: string;
    }): Promise<CommentAsset[] | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(film_id);
      if (!is_mongo_id || !film_id) {
        return null;
      }

      const query_conditions = { deleted_at: undefined, film: film_id };

      const existing = await commentAssetDbModel
        .find(query_conditions)
        .populate([
          {
            path: "film",
            populate: [
              {
                path: "user",
              },
            ],
          },
          {
            path: "parent",
            populate: [
              {
                path: "film",
              },
              {
                path: "user",
              },
            ],
          },
          {
            path: "children",
            populate: [
              {
                path: "film",
              },
              {
                path: "user",
              },
            ],
          },
        ])
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      if (existing) {
        return existing.map((comment_asset) => new CommentAsset(comment_asset));
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
    }): Promise<PaginatedCommentAssetResult | null> {
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      const query_conditions = { deleted_at: undefined };

      if (query) {
        Object.assign(query_conditions, {
          $or: [{ title: { $regex: ".*" + query + ".*", $options: "si" } }],
        });
      }

      const existing = await commentAssetDbModel
        .find(query_conditions)
        .populate([
          {
            path: "film",
            populate: [
              {
                path: "user",
              },
            ],
          },
          {
            path: "parent",
            populate: [
              {
                path: "film",
              },
              {
                path: "user",
              },
            ],
          },
          {
            path: "children",
            populate: [
              {
                path: "film",
              },
              {
                path: "user",
              },
            ],
          },
        ])
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort({
          created_at: "desc",
        })
        .lean({ virtuals: true });

      const total_count = await commentAssetDbModel.countDocuments(
        query_conditions
      );

      if (existing) {
        const data = existing.map(
          (comment_asset) => new CommentAsset(comment_asset)
        );

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

    async insert(
      insertPayload: ICommentAssetData
    ): Promise<CommentAsset | null> {
      const result = await commentAssetDbModel.create([
        {
          parent: insertPayload.parent,
          children: insertPayload.children,
        },
      ]);

      const updated = await commentAssetDbModel
        .findOne({ _id: result[0]?._id })
        .populate({ path: "parent", select: "-__v" })
        .populate({ path: "children", select: "-__v" })
        .lean();

      if (updated) {
        return new CommentAsset(updated);
      }

      return updated;
    }

    async delete({ id }: { id: string }): Promise<CommentAsset | null> {
      const existing = await commentAssetDbModel.findOneAndUpdate(
        { _id: id },
        { deleted_at: new Date() }
      );
      const updated = await commentAssetDbModel
        .findOne({ _id: id })
        .lean({ virtuals: true });
      if (updated) {
        return new CommentAsset(updated);
      }
      return null;
    }

    async deleteByCommentId({
      comment_id,
    }: {
      comment_id: string;
    }): Promise<CommentAsset | null> {
      const existing = await commentAssetDbModel.findOneAndUpdate(
        { parent: comment_id },
        { deleted_at: new Date() }
      );
      const updated = await commentAssetDbModel
        .findOne({ parent: comment_id })
        .lean({ virtuals: true });
      if (updated) {
        return new CommentAsset(updated);
      }
      return null;
    }

    async hardDelete({ id }: { id: string }): Promise<CommentAsset | null> {
      const existing = await commentAssetDbModel.deleteOne({ _id: id });
      const updated = await commentAssetDbModel
        .findOne({ _id: id })
        .lean({ virtuals: true });
      if (updated) {
        return new CommentAsset(updated);
      }
      return null;
    }

    async update(
      payload: Partial<ICommentAsset>
    ): Promise<CommentAsset | null> {
      const result = await commentAssetDbModel
        .findOneAndUpdate({ _id: payload._id }, payload)
        .lean({ virtuals: true });

      const updated = await commentAssetDbModel
        .findOne({ _id: result?._id })
        .populate([
          {
            path: "film",
            populate: [
              {
                path: "user",
              },
            ],
          },
          {
            path: "parent",
            populate: [
              {
                path: "film",
              },
              {
                path: "user",
              },
            ],
          },
          {
            path: "children",
            populate: [
              {
                path: "film",
              },
              {
                path: "user",
              },
            ],
          },
        ])
        .lean({ virtuals: true });

      if (updated) {
        return new CommentAsset(updated);
      }

      return null;
    }

    async findById({ id }: { id: string }): Promise<CommentAsset | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(id);
      if (!is_mongo_id || !id) {
        return null;
      }

      const existing = await commentAssetDbModel
        .findById(id)
        .populate([
          {
            path: "film",
            populate: [
              {
                path: "user",
              },
            ],
          },
          {
            path: "parent",
            populate: [
              {
                path: "film",
              },
              {
                path: "user",
              },
            ],
          },
          {
            path: "children",
            populate: [
              {
                path: "film",
              },
              {
                path: "user",
              },
            ],
          },
        ])
        .lean({ virtuals: true });

      if (existing) {
        return new CommentAsset(existing);
      }
      return null;
    }

    async findByCommentId({
      id,
    }: {
      id: string;
    }): Promise<CommentAsset | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(id);
      if (!is_mongo_id || !id) {
        return null;
      }

      const query_conditions = {
        deleted_at: undefined,
        parent: new mongoose.Types.ObjectId(id),
      };

      const existing = await commentAssetDbModel
        .findOne(query_conditions)
        .populate([
          {
            path: "film",
            populate: [
              {
                path: "user",
              },
            ],
          },
          {
            path: "parent",
            populate: [
              {
                path: "film",
              },
              {
                path: "user",
              },
            ],
          },
          {
            path: "children",
            populate: [
              {
                path: "film",
              },
              {
                path: "user",
              },
            ],
          },
        ])
        .lean({ virtuals: true });

      if (existing) {
        return new CommentAsset(existing);
      }
      return null;
    }
  })();
}
