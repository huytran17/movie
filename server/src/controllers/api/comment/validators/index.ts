import deleteCommentRules from "./delete-comment";
import updateCommentRules from "./update-comment";
import createCommentRules from "./create-comment";
import getCommentByIdRules from "./get-comment";
import getCommentsByFilmIdRules from "./get-comments-by-film-id";
import likeCommentRules from "./like-comment";
import replyCommentRules from "./reply-comment";

export default Object.freeze({
  deleteCommentRules,
  updateCommentRules,
  createCommentRules,
  getCommentByIdRules,
  getCommentsByFilmIdRules,
  likeCommentRules,
  replyCommentRules,
});

export {
  deleteCommentRules,
  updateCommentRules,
  createCommentRules,
  getCommentByIdRules,
  getCommentsByFilmIdRules,
  likeCommentRules,
  replyCommentRules,
};
