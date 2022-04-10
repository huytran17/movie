import mongoose from "mongoose";

import {
  getFeedbacks,
  removeFeedback,
  createFeedback,
  updateFeedback,
  getFeedbackById,
} from "../../../use-cases/feedback";
import makeGetFeedbacksController from "./get-feedbacks";
import makeDeleteFeedbackController from "./delete-feedback";
import makeCreateFeedbackController from "./create-feedback";
import makeUpdateFeedbackController from "./update-feedback";

const updateFeedbackController = makeUpdateFeedbackController({
  updateFeedback,
  getFeedbackById,
  mongoose,
});

const createFeedbackController = makeCreateFeedbackController({
  createFeedback,
});

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
  createFeedbackController,
  updateFeedbackController,
});

export {
  getFeedbacksController,
  deleteFeedbackController,
  createFeedbackController,
  updateFeedbackController,
};
