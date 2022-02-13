import mongoose from "mongoose";
import IStoryDb, { PaginatedStoryResult } from "./interfaces/story-db";
import IStory from "../interfaces/story";
import Story from "../entities/story";

export default function makeStoryDb({
  storyDbModel,
  moment,
}: {
  storyDbModel: mongoose.Model<
    IStory & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): IStoryDb {
  return new (class MongooseStoryDb implements IStoryDb {})();
}
