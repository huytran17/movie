import { FeedbackDb } from "../../data-access";

import makeCreateFeedback from "./create-feedback";
import makeGetFeedbacks from "./get-feedbacks";
import makeRemoveFeedback from "./delete-feedback";
import makeGetFeedbackById from "./get-feedback-by-id";
import makeUpdateFeedback from "./update-feedback";

const getFeedbackById = makeGetFeedbackById(FeedbackDb);

const updateFeedback = makeUpdateFeedback(FeedbackDb);

const removeFeedback = makeRemoveFeedback(FeedbackDb);

const createFeedback = makeCreateFeedback(FeedbackDb);

/**
 * used by admin dashboard to get films
 * TODO: this logic to get films is flawed. It should be server side search
 */
const getFeedbacks = makeGetFeedbacks(FeedbackDb);

const filmServices = Object.freeze({
  createFeedback,
  getFeedbacks,
  removeFeedback,
  getFeedbackById,
  updateFeedback,
});

export default filmServices;
export {
  createFeedback,
  getFeedbacks,
  removeFeedback,
  getFeedbackById,
  updateFeedback,
};
