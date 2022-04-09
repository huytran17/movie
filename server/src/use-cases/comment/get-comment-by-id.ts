import Comment from "../../entities/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";

export type IGetCommentById = ({
  id,
}: {
  id: string;
}) => Promise<Comment | null>;

export default function makeGetCommentById(
  commentDb: ICommentDb
): IGetCommentById {
  return async function getCommentById({
    id,
  }: {
    id: string;
  }): Promise<Comment | null> {
    const comment = await commentDb.findById({ id });
    return comment;
  };
}
