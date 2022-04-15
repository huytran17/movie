import IFilm, { CategoryType } from "../interfaces/film";

export default class Film implements IFilm {
  public readonly _id: string;
  public readonly title: string;
  public readonly aws?: Record<string, unknown>;
  public readonly description: string;
  public readonly url: string;
  public readonly aws_thumnail: Record<string, unknown>;
  public readonly category: CategoryType;
  public readonly meta: {
    view_count: number;
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
    description,
    meta,
    aws_thumnail,
    url,
    category,
  }: IFilm) {
    this._id = _id;
    this.aws = aws;
    this.title = title;
    this.description = description;
    this.url = url;
    this.aws_thumnail = aws_thumnail;
    this.meta = meta;
    this.category = category;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
