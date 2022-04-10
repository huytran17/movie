import mongoose from "mongoose";

import { getFeedbacks, removeFeedback } from "../../../use-cases/feedback";
import makeGetFeedbacksController from "./get-feedbacks";
import makeDeleteFeedbackController from "./delete-feedback";

const deleteFeedbackController = makeDeleteFeedbackController({
  deleteFeedbackById: removeFeedback,
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
