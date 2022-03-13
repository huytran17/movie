import IUser from "../interfaces/user";

export default class User implements IUser {
  public readonly _id: string;
  public readonly hash_password: string;
  public readonly first_name?: string;
  public readonly last_name?: string;
  public readonly avatar?: string;
  public readonly email: string;
  public readonly phone_number?: string;
  public readonly country_code: string;
  public readonly full_name: string;
  public readonly alias_name: string;
  public readonly language_code: string;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;
  public readonly email_verified_at: Date;

  constructor({
    _id,
    hash_password,
    first_name,
    last_name,
    avatar,
    email,
    full_name,
    alias_name,
    phone_number,
    country_code,
    language_code,
    email_verified_at,
    created_at,
    updated_at,
    deleted_at,
  }: IUser) {
    this._id = _id;
    this.hash_password = hash_password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.avatar = avatar;
    this.alias_name = alias_name;
    this.full_name = full_name;
    this.phone_number = phone_number;
    this.email_verified_at = email_verified_at;
    this.country_code = country_code;
    this.language_code = language_code;
    this.email = email;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
