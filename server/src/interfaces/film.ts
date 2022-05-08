import ISeries from "./series";

export default interface IAdmin {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  series: ISeries;
  aws_thumbnail?: Record<string, unknown>;
  aws_trailer?: Record<string, unknown>;
  meta: {
    view_count: number;
    director: string;
    actors: string[];
    duration: {
      hour: string;
      minute: string;
    };
    countries: string[];
    quality: string;
    rating: string;
    languages: string[];
    status: string;
    tags: string[];
    age_limit: number;
    studio: string;
    manufactured_at: Date;
    released_at: Date;
  };
  categories: CategoryType[];
  aws?: Record<string, unknown>;
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
  Fiction = "fiction",
  Theater = "theater",
  Action = "action",
}
