import IUser from "../interfaces/user";

export default class User implements IUser {
  public readonly _id: string;
  public readonly hash_password: string;
  public readonly first_name?: string;
  public readonly last_name?: string;
  public readonly aws?: Record<string, unknown>;
  public readonly avatar_url?: string;
  public readonly email: string;
  public readonly full_name: string;
  public readonly birthday: Date;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;
  public readonly email_verified_at: Date;

  constructor({
    _id,
    hash_password,
    avatar_url,
    first_name,
    last_name,
    aws,
    email,
    full_name,
    email_verified_at,
    birthday,
    created_at,
    updated_at,
    deleted_at,
  }: IUser) {
    this._id = _id;
    this.avatar_url = avatar_url;
    this.hash_password = hash_password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.birthday = birthday;
    this.aws = aws;
    this.full_name = full_name;
    this.email_verified_at = email_verified_at;
    this.email = email;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
