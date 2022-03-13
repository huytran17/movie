export default interface IUser {
  _id: string;
  hash_password: string;
  first_name?: string;
  last_name?: string;
  full_name: string;
  alias_name: string;
  avatar?: string;
  email: string;
  phone_number?: string;
  country_code: string;
  language_code: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  email_verified_at: Date;
}
