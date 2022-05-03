import mongoose from "mongoose";

import { getCommentAssets } from "../../../use-cases/comment-asset";
import makeGetCommentAssetController from "./get-comment-assets";

/**
 * @description update comment-asset's details excluding password
 */
const getCommentAssetController = makeGetCommentAssetController({
  getCommentAssets,
});

export default Object.freeze({
  getCommentAssetController,
});

export { getCommentAssetController };
