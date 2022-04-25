import { CommentDb } from "../../data-access";

import makeCreateComment from "./create-comment";
import makeUpdateComment from "./update-comment";
import makeGetCommentById from "./get-comment-by-id";
import makeRemoveCommentById from "./delete-comment-by-id";
import makeGetComments from "./get-comments";
import makeGetCommentsByFilmId from "./get-comments-by-film-id";

const createComment = makeCreateComment(CommentDb);
const updateComment = makeUpdateComment(CommentDb);
const removeCommentById = makeRemoveCommentById(CommentDb);
const getCommentsByFilmId = makeGetCommentsByFilmId(CommentDb);

/**
 * get film by _id
 * @function getCommentsByFilmId
 */
const getCommentById = makeGetCommentById(CommentDb);

/**
 * used by admin dashboard to get films
 * TODO: this logic to get films is flawed. It should be server side search
 */
const getComments = makeGetComments(CommentDb);

const filmServices = Object.freeze({
  createComment,
  getCommentById,
  getComments,
  updateComment,
  removeCommentById,
  getCommentsByFilmId,
});

export default filmServices;
export {
  createComment,
  getCommentById,
  getComments,
  updateComment,
  removeCommentById,
  getCommentsByFilmId,
};
