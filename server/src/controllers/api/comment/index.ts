import mongoose from "mongoose";

import {
  createComment,
  getCommentById,
  getComments,
  updateComment,
  removeCommentById,
  getCommentsByFilmId,
} from "../../../use-cases/comment";
import { getFilmById } from "../../../use-cases/film";
import makeUpdateCommentController from "./update-comment";
import makeGetCommentsController from "./get-comments";
import makeDeleteCommentController from "./delete-comment";
import makeCreateCommentController from "./create-comment";
import makeGetCommentByIdController from "./get-comment-by-id";
import makeGetCommentByFilmIdController from "./get-comments-by-film-id";

const getCommentsByFilmIdController = makeGetCommentByFilmIdController({
  getCommentsByFilmId,
  getFilmById,
});

const getCommentByIdController = makeGetCommentByIdController({
  getCommentById,
});

const createCommentController = makeCreateCommentController({
  createComment,
});

const deleteCommentController = makeDeleteCommentController({
  deleteCommentById: removeCommentById,
  getCommentById,
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
  getCommentByIdController,
  getCommentsByFilmIdController,
});

export {
  updateCommentController,
  getCommentsController,
  deleteCommentController,
  createCommentController,
  getCommentByIdController,
  getCommentsByFilmIdController,
};
