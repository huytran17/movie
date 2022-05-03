import CommentAsset from "../../entities/comment-asset";
import ICommentAssetDb from "../../data-access/interfaces/comment-asset-db";

export type IGetCommentAssetByCommentId = ({
  id,
}: {
  id: string;
}) => Promise<CommentAsset | null>;

export default function makeGetCommentAssetByCommentId(
  commentAssetDb: ICommentAssetDb
): IGetCommentAssetByCommentId {
  return async function getCommentAssetByCommentId({
    id,
  }: {
    id: string;
  }): Promise<CommentAsset | null> {
    const comment_asset = await commentAssetDb.findByCommentId({ id });
    return comment_asset;
  };
}
