import CommentAsset from "../../entities/comment-asset";
import ICommentAssetDb from "../../data-access/interfaces/comment-asset-db";

export interface ICreateCommentAssetData {
  parent: string;
  children: string[];
  film: string;
}

export type ICreateCommentAsset = ({
  parent,
  children,
  film,
}: ICreateCommentAssetData) => Promise<CommentAsset | null>;

export default function makeCreateCommentAsset(
  commentAssetDb: ICommentAssetDb
): ICreateCommentAsset {
  return async function createCommentAsset({
    parent,
    children,
    film,
  }: ICreateCommentAssetData): Promise<CommentAsset | null> {
    const createdCommentAsset = await commentAssetDb.insert({
      parent,
      children,
      film,
    });
    return createdCommentAsset;
  };
}
