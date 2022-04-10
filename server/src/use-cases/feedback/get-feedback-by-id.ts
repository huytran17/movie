import Feedback from "../../entities/feedback";
import IFeedbackDb from "../../data-access/interfaces/feedback-db";

export type IGetFeedbackById = ({
  id,
}: {
  id: string;
}) => Promise<Feedback | null>;

export default function makeGetFeedbackById(
  feedbackDb: IFeedbackDb
): IGetFeedbackById {
  return async function getFeedbackById({
    id,
  }: {
    id: string;
  }): Promise<Feedback | null> {
    const feedback = await feedbackDb.findById({ id });
    return feedback;
  };
}
