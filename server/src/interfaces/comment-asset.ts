import Comment from "../entities/comment";

export default interface ICommentAsset {
  _id: string;
  parent: Comment;
  children: Comment[];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
