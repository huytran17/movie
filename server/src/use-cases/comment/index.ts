import { CommentDb } from "../../data-access";

import makeCreateComment from "./create-comment";
import makeUpdateComment from "./update-comment";
import makeGetCommentById from "./get-comment-by-id";
import makeRemoveCommentById from "./delete-comment-by-id";
import makeGetComments from "./get-comments";

const createComment = makeCreateComment(CommentDb);
const updateComment = makeUpdateComment(CommentDb);
const removeCommentById = makeRemoveCommentById(CommentDb);

/**
 * get film by _id
 * @function getCommentById
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
});

export default filmServices;
export {
  createComment,
  getCommentById,
  getComments,
  updateComment,
  removeCommentById,
};
