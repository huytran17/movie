import CommentAsset from "../../entities/comment-asset";
import ICommentAssetDb from "../../data-access/interfaces/comment-asset-db";

export type IDeleteCommentAssetByCommentId = ({
  comment_id,
}: {
  comment_id: string;
}) => Promise<CommentAsset | null>;

export default function makeDeleteCommentAssetByCommentId(
  commentAssetDb: ICommentAssetDb
): IDeleteCommentAssetByCommentId {
  return async function deleteCommentAssetByCommentId({
    comment_id,
  }: {
    comment_id: string;
  }): Promise<CommentAsset | null> {
    const deletedCommentAsset = await commentAssetDb.deleteByCommentId({
      comment_id,
    });
    return deletedCommentAsset;
  };
}
