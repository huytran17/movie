import IUser from "../interfaces/user";
import IFilm from "../interfaces/film";
import IFeedback from "../interfaces/feedback";

export default class Comment {
  public readonly content: string;
  public readonly user: IUser;
  public readonly film: IFilm;
  public readonly star_count: number;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  constructor({
    content,
    user,
    film,
    star_count,
    created_at,
    updated_at,
    deleted_at,
  }: IFeedback) {
    this.content = content;
    this.user = user;
    this.film = film;
    this.star_count = star_count;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
