import Comment from "../../entities/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";

export type IGetCommentsByFilmId = ({
  film_id,
}: {
  film_id: string;
}) => Promise<Comment[] | null>;

export default function makeGetCommentsByFilmId(
  commentDb: ICommentDb
): IGetCommentsByFilmId {
  return async function getCommentsByFilmId({
    film_id,
  }: {
    film_id: string;
  }): Promise<Comment[] | null> {
    const comments = await commentDb.findByFilmId({ film_id });
    return comments;
  };
}
