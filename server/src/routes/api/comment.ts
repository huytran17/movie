import express from "express";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";

import {
  deleteCommentRules,
  updateCommentRules,
  createCommentRules,
  getCommentByIdRules,
  getCommentsByFilmIdRules,
} from "../../controllers/api/comment/validators";
import {
  getCommentByIdController,
  updateCommentController,
  getCommentsByFilmIdController,
  deleteCommentController,
  createCommentController,
} from "../../controllers/api/comment";

const commentRouter = express.Router();

commentRouter.get(
  "/:comment_id",
  makeValidator(getCommentByIdRules),
  makeExpressCallback(getCommentByIdController)
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
