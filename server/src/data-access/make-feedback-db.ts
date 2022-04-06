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
  return new (class MongooseFeedbackDb implements IFeedbackDb {})();
}
