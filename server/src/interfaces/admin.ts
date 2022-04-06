export default interface IAdmin {
  _id: string;
  first_name: string;
  last_name: string;
  hash_password: string;
  type: AdminType;
  avatar_url?: string;
  phone_number?: string;
  email: string;
  address?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export enum AdminType {
  Super = "super",
  Normal = "normal",
}
