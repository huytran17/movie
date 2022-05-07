import Comment from "../entities/comment";
import Film from "../entities/film";

export default interface ICommentAsset {
  _id: string;
  parent: Comment;
  film: Film;
  children: Comment[];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
