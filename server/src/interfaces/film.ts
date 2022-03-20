export default interface IAdmin {
  _id: string;
  title: string;
  description: string;
  url: string;
  thumnail_url: string;
  slug: string;
  views: number;
  manufactured_at: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
