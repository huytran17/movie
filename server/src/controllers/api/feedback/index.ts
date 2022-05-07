import mongoose from "mongoose";

import {
  getFeedbacks,
  removeFeedback,
  createFeedback,
  updateFeedback,
  getFeedbackById,
  getFeedbacksByFilmId,
} from "../../../use-cases/feedback";
import { updateFilm, getFilmById } from "../../../use-cases/film";
import makeGetFeedbacksController from "./get-feedbacks";
import makeDeleteFeedbackController from "./delete-feedback";
import makeCreateFeedbackController from "./create-feedback";
import makeUpdateFeedbackController from "./update-feedback";
import makeGetFeedbackByFilmIdController from "./get-feedbacks-by-film-id";

const getFeedbacksByFilmIdController = makeGetFeedbackByFilmIdController({
  getFeedbacksByFilmId,
});

const updateFeedbackController = makeUpdateFeedbackController({
  updateFeedback,
  getFeedbackById,
  mongoose,
});

const createFeedbackController = makeCreateFeedbackController({
  createFeedback,
  updateFilm,
  getFilmById,
  getFeedbacksByFilmId,
});

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
  createFeedbackController,
  updateFeedbackController,
  getFeedbacksByFilmIdController,
});

export {
  getFeedbacksController,
  deleteFeedbackController,
  createFeedbackController,
  updateFeedbackController,
  getFeedbacksByFilmIdController,
};
