import express from "express";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";

import {
  deleteCommentRules,
  updateCommentRules,
  createCommentRules,
  getCommentByIdRules,
} from "../../controllers/api/comment/validators";
import {
  getCommentByIdController,
  updateCommentController,
  getCommentsController,
  deleteCommentController,
  createCommentController,
} from "../../controllers/api/comment";

const commentRouter = express.Router();

commentRouter.get(
  "/:comment_id",
  makeValidator(getCommentByIdRules),
  makeExpressCallback(getCommentByIdController)
);

commentRouter.get("/", makeExpressCallback(getCommentsController));

commentRouter.post(
  "/create-comment/:user/:film",
  makeValidator(createCommentRules),
  makeExpressCallback(createCommentController)
);

export default commentRouter;
