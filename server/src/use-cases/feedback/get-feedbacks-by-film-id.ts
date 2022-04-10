import Feedback from "../../entities/feedback";
import IFeedbackDb from "../../data-access/interfaces/feedback-db";

export type IGetFeedbacksByFilmId = ({
  id,
}: {
  id: string;
}) => Promise<Feedback[] | null>;

export default function makeGetFeedbacksByFilmId(
  feedbackDb: IFeedbackDb
): IGetFeedbacksByFilmId {
  return async function getFeedbacksByFilmId({
    id,
  }: {
    id: string;
  }): Promise<Feedback[] | null> {
    const feedbacks = await feedbackDb.findAllByFilmId({ film_id: id });
    return feedbacks;
  };
}
