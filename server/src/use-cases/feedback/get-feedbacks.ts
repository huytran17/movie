import Feedback from "../../entities/feedback";
import IFeedbackDb from "../../data-access/interfaces/feedback-db";

export type IGetFeedbacks = () => Promise<Feedback[] | null>;

export default function makeGetFeedbacks(
  feedbackDb: IFeedbackDb
): IGetFeedbacks {
  return async function getFeedbacks(): Promise<Feedback[] | null> {
    const feedbacks = await feedbackDb.findAll();
    return feedbacks;
  };
}
