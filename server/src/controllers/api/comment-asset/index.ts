import mongoose from "mongoose";

import {
  createCommentAsset,
  getCommentAssets,
  updateCommentAsset,
  deleteCommentAssetById,
  getCommentAssetByCommentId,
} from "../../../use-cases/comment-asset";
import makeUpdateCommentAssetController from "./update-comment-asset";
import makeGetCommentAssetController from "./get-comment-assets";
import makeDeleteCommentAssetController from "./delete-comment-asset";
import makeCreateCommentAssetController from "./create-comment-asset";

const createCommentAssetController = makeCreateCommentAssetController({
  createCommentAsset,
});

const deleteCommentAssetController = makeDeleteCommentAssetController({
  deleteCommentAssetById,
  getCommentAssetByCommentId,
});
/**
 * @description update comment-asset's details excluding password
 */
const getCommentAssetController = makeGetCommentAssetController({
  getCommentAssets,
});

/**
 * @description update comment-asset's details excluding password
 */
const updateCommentAssetController = makeUpdateCommentAssetController({
  updateCommentAsset,
  getCommentAssetByCommentId,
  mongoose,
});

export default Object.freeze({
  updateCommentAssetController,
  getCommentAssetController,
  deleteCommentAssetController,
  createCommentAssetController,
});

export {
  updateCommentAssetController,
  getCommentAssetController,
  deleteCommentAssetController,
  createCommentAssetController,
};
