export default interface IAdmin {
  _id: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  type: AdminType;
  avatar?: string;
  phone_number?: string;
  email: string;
  country_code: string;
  language_code: string;
  address?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export enum AdminType {
  Super = "super",
  Normal = "normal",
}
