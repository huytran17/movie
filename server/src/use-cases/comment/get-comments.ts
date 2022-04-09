import Comment from "../../entities/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";

export type IGetComments = () => Promise<Comment[] | null>;

export default function makeGetComments(commentDb: ICommentDb): IGetComments {
  return async function getComments(): Promise<Comment[] | null> {
    const comments = await commentDb.findAll();
    return comments;
  };
}
