import IFilm from "../interfaces/film";
import ISeries from "../interfaces/series";

export default class Series {
  public readonly _id: string;
  public readonly film: IFilm;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  constructor({ _id, film, created_at, updated_at, deleted_at }: ISeries) {
    this._id = _id;
    this.film = film;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
