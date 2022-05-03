import CommentAsset from "../../entities/comment-asset";
import ICommentAssetDb from "../../data-access/interfaces/comment-asset-db";

export type IDeleteCommentAssetById = ({
  id,
}: {
  id: string;
}) => Promise<CommentAsset | null>;

export default function makeDeleteCommentAssetById(
  commentAssetDb: ICommentAssetDb
): IDeleteCommentAssetById {
  return async function removeCommentAssetById({
    id,
  }: {
    id: string;
  }): Promise<CommentAsset | null> {
    const deletedCommentAsset = await commentAssetDb.delete({ id });
    return deletedCommentAsset;
  };
}
