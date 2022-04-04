import IFilm, { CategoryType } from "../interfaces/film";

export default class Film implements IFilm {
  public readonly _id: string;
  public readonly title: string;
  public readonly description: string;
  public readonly url: string;
  public readonly slug: string;
  public readonly thumnail_url: string;
  public readonly views: number;
  public readonly category: CategoryType;
  public readonly manufactured_at: Date;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  constructor({
    _id,
    created_at,
    slug,
    updated_at,
    deleted_at,
    title,
    description,
    views,
    thumnail_url,
    manufactured_at,
    url,
    category,
  }: IFilm) {
    this._id = _id;
    this.slug = slug;
    this.title = title;
    this.description = description;
    this.url = url;
    this.thumnail_url = thumnail_url;
    this.views = views;
    this.manufactured_at = manufactured_at;
    this.category = category;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
