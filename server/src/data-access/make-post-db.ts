import mongoose from "mongoose";

import IPostDb, { PaginatedPostResult } from "./interfaces/post-db";
import IPost from "../interfaces/post";
import Post from "../entities/post";

export default function makePostDb({
  postDbModel,
  moment,
}: {
  postDbModel: mongoose.Model<
    IPost & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): IPostDb {
  return new (class MongoosePostDb implements IPostDb {})();
}
