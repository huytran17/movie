import Comment from "../../entities/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";

export type IRemoveCommentById = ({
  id,
}: {
  id: string;
}) => Promise<Comment | null>;

export default function makeRemoveCommentById(
  commentDb: ICommentDb
): IRemoveCommentById {
  return async function removeCommentById({
    id,
  }: {
    id: string;
  }): Promise<Comment | null> {
    const deletedComment = await commentDb.delete({ id });
    return deletedComment;
  };
}
