import CommentAsset from "../../entities/comment-asset";
import ICommentAsset from "../../interfaces/comment-asset";
import ICommentAssetDb from "../../data-access/interfaces/comment-asset-db";

export interface ICreateCommentAssetData {
  commentAssetDetails: Omit<ICommentAsset, "_id">;
}

export type ICreateCommentAsset = ({
  commentAssetDetails,
}: ICreateCommentAssetData) => Promise<CommentAsset | null>;

export default function makeCreateCommentAsset(
  commentAssetDb: ICommentAssetDb
): ICreateCommentAsset {
  return async function createCommentAsset({
    commentAssetDetails,
  }: ICreateCommentAssetData): Promise<CommentAsset | null> {
    const createdCommentAsset = await commentAssetDb.insert(
      commentAssetDetails
    );
    return createdCommentAsset;
  };
}
