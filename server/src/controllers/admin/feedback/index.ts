import {
  getFeedbacks,
  removeFeedback,
  getFeedbackById,
} from "../../../use-cases/feedback";
import makeGetFeedbacksController from "./get-feedbacks";
import makeDeleteFeedbackController from "./delete-feedback";

const deleteFeedbackController = makeDeleteFeedbackController({
  deleteFeedbackById: removeFeedback,
  getFeedbackById,
});
/**
 * @description update feedback's details excluding password
 */
const getFeedbacksController = makeGetFeedbacksController({ getFeedbacks });

export default Object.freeze({
  getFeedbacksController,
  deleteFeedbackController,
});

export { getFeedbacksController, deleteFeedbackController };
