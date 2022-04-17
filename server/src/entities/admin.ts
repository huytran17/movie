import IAdmin, { AdminType } from "../interfaces/admin";

export default class Admin {
  public readonly _id: string;
  public readonly first_name: string;
  public readonly last_name: string;
  public readonly hash_password: string;
  public readonly type: AdminType;
  public readonly avatar_url?: string;
  public readonly email: string;
  public readonly address?: string;
  public readonly birthday: Date;
  public readonly phone_number?: string;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  constructor({
    _id,
    first_name,
    last_name,
    hash_password,
    type,
    avatar_url,
    email,
    address,
    phone_number,
    birthday,
    created_at,
    updated_at,
    deleted_at,
  }: IAdmin) {
    this._id = _id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.hash_password = hash_password;
    this.type = type;
    this.avatar_url = avatar_url;
    this.email = email;
    this.birthday = birthday;
    this.address = address;
    this.phone_number = phone_number;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
