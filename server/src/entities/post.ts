import IPost from "../interfaces/post";
import Admin from "./admin";

export default class Post {
  public readonly title: string;
  public readonly content: string;
  public readonly author: Admin;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  constructor({
    title,
    content,
    author,
    created_at,
    updated_at,
    deleted_at,
  }: IPost) {
    this.title = title;
    this.content = content;
    this.author = author;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
