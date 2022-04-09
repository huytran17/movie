import Comment from "../../entities/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";
import IComment from "../../interfaces/comment";
import _ from "lodash";

interface IUpdateCommentData {
  commentDetails: Partial<IComment>;
}
export type IUpdateComment = ({
  commentDetails,
}: IUpdateCommentData) => Promise<Comment | null>;

export default function makeUpdateComment(
  commentDb: ICommentDb
): IUpdateComment {
  return async function updateComment({
    commentDetails,
  }: IUpdateCommentData): Promise<Comment | null> {
    const existing_by_id = await commentDb.findById({
      id: commentDetails._id as string,
    });
    const existing = existing_by_id;

    if (!existing) {
      throw new RangeError("Comment not found.");
    }

    const omit_list = ["_id"];

    const final_comment_detail = _.omit(commentDetails, omit_list);
    const comment = new Comment(
      Object.assign({}, existing, final_comment_detail, {
        updated_at: new Date(),
      })
    );

    const updatedComment = await commentDb.update(comment);
    return updatedComment;
  };
}
