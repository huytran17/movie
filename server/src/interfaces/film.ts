export default interface IAdmin {
  _id: string;
  title: string;
  description: string;
  film_url: string;
  thumnail_url: string;
  slug: string;
  meta: {
    view_count: number;
    manufactured_at: Date;
  };
  category: CategoryType;
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
