import ICommentAsset from "../interfaces/comment-asset";
import Comment from "../entities/comment";
import Film from "../entities/film";

export default class CommentAsset {
  public readonly _id: string;
  public readonly film: Film;
  public readonly parent: Comment;
  public readonly children: Comment[];
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  constructor({
    _id,
    created_at,
    updated_at,
    deleted_at,
    parent,
    children,
    film,
  }: ICommentAsset) {
    this._id = _id;
    this.parent = parent;
    this.film = film;
    this.created_at = created_at;
    this.children = children;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
