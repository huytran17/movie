import Feedback from "../../entities/feedback";
import IFeedbackDb from "../../data-access/interfaces/feedback-db";

export type IGetFeedbacksByFilmId = ({
  film_id,
}: {
  film_id: string;
}) => Promise<Feedback[] | null>;

export default function makeGetFeedbacksByFilmId(
  feedbackDb: IFeedbackDb
): IGetFeedbacksByFilmId {
  return async function getFeedbacksByFilmId({
    film_id,
  }: {
    film_id: string;
  }): Promise<Feedback[] | null> {
    const feedbacks = await feedbackDb.findAllByFilmId({ film_id });
    return feedbacks;
  };
}
