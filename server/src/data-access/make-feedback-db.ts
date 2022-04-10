import mongoose from "mongoose";

import IFeedbackDb from "./interfaces/feedback-db";
import IFeedback from "../interfaces/feedback";
import Feedback from "../entities/feedback";

export default function makeFeedbackDb({
  feedbackDbModel,
  moment,
}: {
  feedbackDbModel: mongoose.Model<
    IFeedback & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): IFeedbackDb {
  return new (class MongooseFeedbackDb implements IFeedbackDb {
    /**
     * @description used by admin dashboard
     * FIXME: Currently not in used. To be removed and should never be used.
     * @param param0
     * @returns
     */
    async findAll(): Promise<Feedback[] | null> {
      const query_conditions = { deleted_at: undefined };
      const existing = await feedbackDbModel
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
        return existing.map((feedback) => new Feedback(feedback));
      }

      return null;
    }

    async insert(payload: Partial<IFeedback>): Promise<Feedback | null> {
      const updated_payload = payload;

      const result = await feedbackDbModel.create([updated_payload]);
      const updated = await feedbackDbModel
        .findOne({ _id: result[0]?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new Feedback(updated);
      }
      return null;
    }

    async delete({ id }: { id: string }): Promise<Feedback | null> {
      const existing = await feedbackDbModel.findOneAndUpdate(
        { _id: id },
        { deleted_at: new Date() }
      );
      const updated = await feedbackDbModel
        .findOne({ _id: id })
        .lean({ virtuals: true });
      if (updated) {
        return new Feedback(updated);
      }
      return null;
    }

    async update(payload: Partial<IFeedback>): Promise<Feedback | null> {
      const result = await feedbackDbModel
        .findOneAndUpdate({ _id: payload._id }, payload)
        .lean({ virtuals: true });

      const updated = await feedbackDbModel
        .findOne({ _id: result?._id })
        .lean({ virtuals: true });

      if (updated) {
        return new Feedback(updated);
      }

      return null;
    }

    async findById({ id }: { id: string }): Promise<Feedback | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(id);
      if (!is_mongo_id || !id) {
        return null;
      }

      const existing = await feedbackDbModel
        .findById(id)
        .lean({ virtuals: true });

      if (existing) {
        return new Feedback(existing);
      }
      return null;
    }

    async findAllByFilmId({
      film_id,
    }: {
      film_id: string;
    }): Promise<Feedback[] | null> {
      const mongo_id_regex = new RegExp(/^[0-9a-fA-F]{24}$/i);
      const is_mongo_id = mongo_id_regex.test(film_id);
      if (!is_mongo_id || !film_id) {
        return null;
      }

      const query_conditions = { deleted_at: undefined, film: film_id };

      const existing = await feedbackDbModel
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
        return existing.map((feedback) => new Feedback(feedback));
      }

      return null;
    }
  })();
}
