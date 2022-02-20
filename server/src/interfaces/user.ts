export default interface IUser {
  _id: string;
  username: string;
  hash_password: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  email: string;
  phone_number?: string;
  country_code: string;
  language_code: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
