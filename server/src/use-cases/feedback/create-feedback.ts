import Feedback from "../../entities/feedback";
import IFeedback from "../../interfaces/feedback";
import IFeedbackDb from "../../data-access/interfaces/feedback-db";

export interface ICreateFeedbackData {
  feedbackDetails: Omit<IFeedback, "_id">;
}

export type ICreateFeedback = ({
  feedbackDetails,
}: ICreateFeedbackData) => Promise<Feedback | null>;

export default function makeCreateFeedback(
  feedbackDb: IFeedbackDb
): ICreateFeedback {
  return async function createFeedback({
    feedbackDetails,
  }: ICreateFeedbackData): Promise<Feedback | null> {
    const createdFeedback = await feedbackDb.insert(feedbackDetails);
    return createdFeedback;
  };
}
