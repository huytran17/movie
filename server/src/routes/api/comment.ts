import express from "express";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";

import {
  deleteCommentRules,
  updateCommentRules,
  createCommentRules,
  getCommentByIdRules,
  getCommentsByFilmIdRules,
  likeCommentRules,
  replyCommentRules,
} from "../../controllers/api/comment/validators";
import {
  getCommentByIdController,
  updateCommentController,
  getCommentsByFilmIdController,
  deleteCommentController,
  createCommentController,
  likeCommentController,
  replyCommentController,
} from "../../controllers/api/comment";

const commentRouter = express.Router();

commentRouter.post(
  "/reply-comment/:user/:film/:parent_comment_id",
  makeValidator(replyCommentRules),
  makeExpressCallback(replyCommentController)
);
commentRouter.get(
  "/:comment_id",
  makeValidator(getCommentByIdRules),
  makeExpressCallback(getCommentByIdController)
);
commentRouter.put(
  "/like/:comment_id/:user_id",
  makeValidator(likeCommentRules),
  makeExpressCallback(likeCommentController)
);
commentRouter.put(
  "/:comment_id",
  makeValidator(updateCommentRules),
  makeExpressCallback(updateCommentController)
);

commentRouter.delete(
  "/:comment_id",
  makeValidator(deleteCommentRules),
  makeExpressCallback(deleteCommentController)
);

commentRouter.get(
  "/by-film/:film_id",
  makeValidator(getCommentsByFilmIdRules),
  makeExpressCallback(getCommentsByFilmIdController)
);

commentRouter.post(
  "/create-comment/:user/:film",
  makeValidator(createCommentRules),
  makeExpressCallback(createCommentController)
);

export default commentRouter;
