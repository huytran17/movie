import IUser from "../interfaces/user";

export default class User implements IUser {
  public readonly _id: string;
  public readonly username: string;
  public readonly password: string;
  public readonly first_name: string;
  public readonly last_name: string;
  public readonly avatar?: string;
  public readonly email: string;
  public readonly phone_number?: string;
  public readonly country_code: string;
  public readonly language: string;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  constructor({
    _id,
    username,
    password,
    first_name,
    last_name,
    avatar,
    email,
    phone_number,
    country_code,
    language,
    created_at,
    updated_at,
    deleted_at,
  }: IUser) {
    this._id = _id;
    this.username = username;
    this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.avatar = avatar;
    this.phone_number = phone_number;
    this.country_code = country_code;
    this.language = language;
    this.email = email;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
