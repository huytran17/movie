import deleteCommentRules from "./delete-comment";
import updateCommentRules from "./update-comment";
import createCommentRules from "./create-comment";
import getCommentByIdRules from "./get-comment";
import getCommentsByFilmIdRules from "./get-comments-by-film-id";
import likeCommentRules from "./like-comment";

export default Object.freeze({
  deleteCommentRules,
  updateCommentRules,
  createCommentRules,
  getCommentByIdRules,
  getCommentsByFilmIdRules,
  likeCommentRules,
});

export {
  deleteCommentRules,
  updateCommentRules,
  createCommentRules,
  getCommentByIdRules,
  getCommentsByFilmIdRules,
  likeCommentRules,
};
