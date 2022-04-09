import IUser from "../interfaces/user";
import IFilm from "../interfaces/film";
import IComment from "../interfaces/comment";

export default class Comment {
  public readonly _id: string;
  public readonly content: string;
  public readonly user: IUser;
  public readonly film: IFilm;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  constructor({
    content,
    user,
    film,
    created_at,
    updated_at,
    deleted_at,
  }: IComment) {
    this.content = content;
    this.user = user;
    this.film = film;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
