import mongoose from "mongoose";

import {
  createComment,
  getCommentById,
  getComments,
  updateComment,
  removeCommentById,
} from "../../../use-cases/comment";
import makeUpdateCommentController from "./update-comment";
import makeGetCommentsController from "./get-comments";
import makeDeleteCommentController from "./delete-comment";
import makeCreateCommentController from "./create-comment";

const createCommentController = makeCreateCommentController({
  createComment,
});

const deleteCommentController = makeDeleteCommentController({
  deleteCommentById: removeCommentById,
});
/**
 * @description update comment's details excluding password
 */
const getCommentsController = makeGetCommentsController({ getComments });

/**
 * @description update comment's details excluding password
 */
const updateCommentController = makeUpdateCommentController({
  updateComment,
  getCommentById,
  mongoose,
});

export default Object.freeze({
  updateCommentController,
  getCommentsController,
  deleteCommentController,
  createCommentController,
});

export {
  updateCommentController,
  getCommentsController,
  deleteCommentController,
  createCommentController,
};
