import mongoose from "mongoose";

import { getCommentAssetsByFilmId } from "../../../use-cases/comment-asset";
import { getFilmById } from "../../../use-cases/film";
import makeGetCommentAssetController from "./get-comment-assets";

/**
 * @description update comment-asset's details excluding password
 */
const getCommentAssetController = makeGetCommentAssetController({
  getCommentAssetsByFilmId,
  getFilmById,
});

export default Object.freeze({
  getCommentAssetController,
});

export { getCommentAssetController };
