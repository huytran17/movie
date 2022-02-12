export default interface IUser {
  _id: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  email: string;
  phone_number?: string;
  country_code: string;
  language: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
