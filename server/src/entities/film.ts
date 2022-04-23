import IFilm, { CategoryType } from "../interfaces/film";
import ISeries from "../interfaces/series";

export default class Film implements IFilm {
  public readonly _id: string;
  public readonly title: string;
  public readonly aws?: Record<string, unknown>;
  public readonly description: string;
  public readonly series: ISeries;
  public readonly aws_thumnail?: Record<string, unknown>;
  public readonly categories: CategoryType[];
  public readonly meta: {
    view_count: number;
    director: string;
    actors: string[];
    total_time: string;
    countries: string[];
    quality: string;
    rating: string;
    languages: string[];
    status: string;
    film_studio: string;
    tags: string[];
    age_limit: number;
    manufactured_at: Date;
    released_at: Date;
  };
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  constructor({
    _id,
    created_at,
    updated_at,
    aws,
    deleted_at,
    title,
    series,
    description,
    meta,
    aws_thumnail,
    categories,
  }: IFilm) {
    this._id = _id;
    this.aws = aws;
    this.series = series;
    this.title = title;
    this.description = description;
    this.aws_thumnail = aws_thumnail;
    this.meta = meta;
    this.categories = categories;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
