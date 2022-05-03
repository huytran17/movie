import CommentAsset from "../../entities/comment-asset";
import ICommentAssetDb from "../../data-access/interfaces/comment-asset-db";

export type IGetCommentAssets = () => Promise<CommentAsset[] | null>;

export default function makeGetCommentAssets(
  commentAssetDb: ICommentAssetDb
): IGetCommentAssets {
  return async function getCommentAsset(): Promise<CommentAsset[] | null> {
    const comment_asset = await commentAssetDb.findAll();
    return comment_asset;
  };
}
