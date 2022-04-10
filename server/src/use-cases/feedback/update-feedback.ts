import Feedback from "../../entities/feedback";
import IFeedbackDb from "../../data-access/interfaces/feedback-db";
import IFeedback from "../../interfaces/feedback";
import _ from "lodash";

interface IUpdateFeedbackData {
  feedbackDetails: Partial<IFeedback>;
}
export type IUpdateFeedback = ({
  feedbackDetails,
}: IUpdateFeedbackData) => Promise<Feedback | null>;

export default function makeUpdateFeedback(
  feedbackDb: IFeedbackDb
): IUpdateFeedback {
  return async function updateFeedback({
    feedbackDetails,
  }: IUpdateFeedbackData): Promise<Feedback | null> {
    const existing_by_id = await feedbackDb.findById({
      id: feedbackDetails._id as string,
    });
    const existing = existing_by_id;

    if (!existing) {
      throw new RangeError("Feedback not found.");
    }

    const omit_list = ["_id"];

    const final_feedback_detail = _.omit(feedbackDetails, omit_list);
    const feedback = new Feedback(
      Object.assign({}, existing, final_feedback_detail, {
        updated_at: new Date(),
      })
    );

    const updatedFeedback = await feedbackDb.update(feedback);
    return updatedFeedback;
  };
}
