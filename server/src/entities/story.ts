import IStory from "../interfaces/story";
import User from "../entities/user";

export default class Story {
  public readonly viewers: User[];
  public readonly creator: User;
  public readonly content: string;
  public readonly expired_at: Date;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  constructor({
    viewers,
    creator,
    content,
    expired_at,
    created_at,
    updated_at,
    deleted_at,
  }: IStory) {
    this.viewers = viewers;
    this.creator = creator;
    this.content = content;
    this.expired_at = expired_at;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
