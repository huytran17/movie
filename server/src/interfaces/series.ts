import IFilm from "./film";

export default interface ISeries {
  _id: string;
  title: string;
  aws_thumbnail?: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
