import Feedback from "../../entities/feedback";
import IFeedbackDb from "../../data-access/interfaces/feedback-db";

export type IRemoveFeedback = ({
  id,
}: {
  id: string;
}) => Promise<Feedback | null>;

export default function makeRemoveFeedback(
  feedbackDb: IFeedbackDb
): IRemoveFeedback {
  return async function removeFeedback({
    id,
  }: {
    id: string;
  }): Promise<Feedback | null> {
    const deletedFeedback = await feedbackDb.delete({ id });
    return deletedFeedback;
  };
}
