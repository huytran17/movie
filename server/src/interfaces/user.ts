export default interface IUser {
  _id: string;
  hash_password: string;
  first_name?: string;
  last_name?: string;
  full_name: string;
  aws?: Record<string, unknown>;
  email: string;
  created_at: Date;
  avatar_url?: string;
  updated_at: Date;
  deleted_at: Date;
  email_verified_at: Date;
}
