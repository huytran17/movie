import CommentAsset from "../../entities/comment-asset";
import ICommentAssetDb from "../../data-access/interfaces/comment-asset-db";

export type IGetCommentAssetsByFilmId = ({
  film_id,
}: {
  film_id: string;
}) => Promise<CommentAsset[] | null>;

export default function makeGetCommentAssetsByFilmId(
  commentDb: ICommentAssetDb
): IGetCommentAssetsByFilmId {
  return async function getCommentAssetsByFilmId({
    film_id,
  }: {
    film_id: string;
  }): Promise<CommentAsset[] | null> {
    const comments = await commentDb.findByFilmId({ film_id });
    return comments;
  };
}
