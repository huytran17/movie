import IFilm, { CategoryType } from "../interfaces/film";
import ISeries from "../interfaces/series";

export default class Film implements IFilm {
  public readonly _id: string;
  public readonly title: string;
  public readonly subtitle?: string;
  public readonly aws?: Record<string, unknown>;
  public readonly aws_trailer?: Record<string, unknown>;
  public readonly description: string;
  public readonly series: ISeries;
  public readonly aws_thumbnail?: Record<string, unknown>;
  public readonly categories: CategoryType[];
  public readonly meta: {
    view_count: number;
    director: string;
    actors: string[];
    duration: {
      hour: string;
      minute: string;
    };
    countries: string[];
    quality: string;
    rating: string;
    languages: string[];
    status: string;
    studio: string;
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
    aws_trailer,
    subtitle,
    updated_at,
    aws,
    deleted_at,
    title,
    series,
    description,
    meta,
    aws_thumbnail,
    categories,
  }: IFilm) {
    this._id = _id;
    this.aws = aws;
    this.series = series;
    this.title = title;
    this.description = description;
    this.aws_thumbnail = aws_thumbnail;
    this.subtitle = subtitle;
    this.meta = meta;
    this.categories = categories;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.aws_trailer = aws_trailer;
  }
}
