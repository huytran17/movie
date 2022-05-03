import express from "express";
import makeExpressCallback from "../../express-callback";

import { getCommentAssetController } from "../../controllers/api/comment-asset";

const commentAssetRouter = express.Router();

commentAssetRouter.get("/", makeExpressCallback(getCommentAssetController));
commentAssetRouter.get(
  "/by-film/:film_id",
  makeExpressCallback(getCommentAssetController)
);

export default commentAssetRouter;
