import Admin from "../entities/admin";

export default interface IPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  thumbnail_photo?: string;
  author: Admin;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
