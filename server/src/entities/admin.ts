import IAdmin, { AdminType } from "../interfaces/admin";

export default class Admin {
  public readonly username: string;
  public readonly first_name: string;
  public readonly last_name: string;
  public readonly password: string;
  public readonly type: AdminType;
  public readonly avatar?: string;
  public readonly email: string;
  public readonly address?: string;
  public readonly phone_number?: string;
  public readonly country_code: string;
  public readonly language_code: string;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  constructor({
    username,
    first_name,
    last_name,
    password,
    type,
    avatar,
    email,
    address,
    phone_number,
    country_code,
    language_code,
    created_at,
    updated_at,
    deleted_at,
  }: IAdmin) {
    this.username = username;
    this.first_name = first_name;
    this.last_name = last_name;
    this.password = password;
    this.type = type;
    this.avatar = avatar;
    this.email = email;
    this.address = address;
    this.phone_number = phone_number;
    this.country_code = country_code;
    this.language_code = language_code;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
