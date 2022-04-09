import Comment from "../../entities/comment";
import IComment from "../../interfaces/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";

export interface ICreateCommentData {
  commentDetails: Omit<IComment, "_id">;
}

export type ICreateComment = ({
  commentDetails,
}: ICreateCommentData) => Promise<Comment | null>;

export default function makeCreateComment(
  commentDb: ICommentDb
): ICreateComment {
  return async function createComment({
    commentDetails,
  }: ICreateCommentData): Promise<Comment | null> {
    const createdComment = await commentDb.insert(commentDetails);
    return createdComment;
  };
}
