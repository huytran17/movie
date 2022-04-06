import mongoose from "mongoose";

import ICommentDb from "./interfaces/comment-db";
import IComment from "../interfaces/comment";
import Comment from "../entities/comment";

export default function makeCommentDb({
  commentDbModel,
  moment,
}: {
  commentDbModel: mongoose.Model<
    IComment & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): ICommentDb {
  return new (class MongooseFeedbackDb implements ICommentDb {})();
}
