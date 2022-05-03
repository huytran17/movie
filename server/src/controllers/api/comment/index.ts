import mongoose from "mongoose";

import {
  createComment,
  getCommentById,
  getComments,
  updateComment,
  removeCommentById,
  getCommentsByFilmId,
} from "../../../use-cases/comment";
import {
  createCommentAsset,
  updateCommentAsset,
  getCommentAssetByCommentId,
  deleteCommentAssetByCommentId,
} from "../../../use-cases/comment-asset";
import { getUserById } from "../../../use-cases/user";
import { getFilmById } from "../../../use-cases/film";
import makeUpdateCommentController from "./update-comment";
import makeGetCommentsController from "./get-comments";
import makeDeleteCommentController from "./delete-comment";
import makeCreateCommentController from "./create-comment";
import makeGetCommentByIdController from "./get-comment-by-id";
import makeGetCommentByFilmIdController from "./get-comments-by-film-id";
import makeLikeCommentController from "./like-comment";
import makeReplyCommentController from "./reply-comment";

const replyCommentController = makeReplyCommentController({
  createComment,
  updateCommentAsset,
  getCommentById,
  getCommentAssetByCommentId,
  mongoose,
});
const likeCommentController = makeLikeCommentController({
  updateComment,
  getCommentById,
  getUserById,
  mongoose,
});

const getCommentsByFilmIdController = makeGetCommentByFilmIdController({
  getCommentsByFilmId,
  getFilmById,
});

const getCommentByIdController = makeGetCommentByIdController({
  getCommentById,
});

const createCommentController = makeCreateCommentController({
  createComment,
  createCommentAsset,
});

const deleteCommentController = makeDeleteCommentController({
  deleteCommentById: removeCommentById,
  getCommentById,
  deleteCommentAssetByCommentId,
  getCommentAssetByCommentId,
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
  likeCommentController,
  replyCommentController,
});

export {
  updateCommentController,
  getCommentsController,
  deleteCommentController,
  createCommentController,
  getCommentByIdController,
  getCommentsByFilmIdController,
  likeCommentController,
  replyCommentController,
};
