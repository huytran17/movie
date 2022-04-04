export default interface IAdmin {
  _id: string;
  title: string;
  description: string;
  url: string;
  thumnail_url: string;
  slug: string;
  views: number;
  category: CategoryType;
  manufactured_at: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export enum CategoryType {
  Comedy = "comedy",
  Horror = "horror",
  Documentary = "documentary",
  Family = "family",
  Kid = "kid",
  Vietnam = "vietnam",
  USUK = "usuk",
}
