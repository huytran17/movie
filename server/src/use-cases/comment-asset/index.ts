import { CommentAssetDb } from "../../data-access";

import makeCreateCommentAsset from "./create-comment-asset";
import makeUpdateCommentAsset from "./update-comment-asset";
import makeGetCommentAssetByCommentId from "./get-comment-asset-by-comment-id";
import makeDeleteCommentAssetById from "./delete-comment-asset-by-id";
import makeGetCommentAssets from "./get-comment-assets";
import makeGetCommentAssetPaginated from "./get-comment-asset-paginated";
import makeGetCommentAssetsByFilmId from "./get-comment-assets-by-film-id";

const getCommentAssetsByFilmId = makeGetCommentAssetsByFilmId(CommentAssetDb);
const createCommentAsset = makeCreateCommentAsset(CommentAssetDb);
const getCommentAssetPaginated = makeGetCommentAssetPaginated(CommentAssetDb);
const updateCommentAsset = makeUpdateCommentAsset(CommentAssetDb);
const deleteCommentAssetById = makeDeleteCommentAssetById(CommentAssetDb);

/**
 * get film by _id
 * @function getCommentAssetById
 */
const getCommentAssetByCommentId =
  makeGetCommentAssetByCommentId(CommentAssetDb);

/**
 * used by admin dashboard to get films
 * TODO: this logic to get films is flawed. It should be server side search
 */
const getCommentAssets = makeGetCommentAssets(CommentAssetDb);

const filmServices = Object.freeze({
  createCommentAsset,
  getCommentAssetByCommentId,
  getCommentAssets,
  updateCommentAsset,
  deleteCommentAssetById,
  getCommentAssetPaginated,
  getCommentAssetsByFilmId,
});

export default filmServices;
export {
  createCommentAsset,
  getCommentAssetByCommentId,
  getCommentAssets,
  updateCommentAsset,
  deleteCommentAssetById,
  getCommentAssetPaginated,
  getCommentAssetsByFilmId,
};
