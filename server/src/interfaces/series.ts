import IFilm from "./film";

export default interface ISeries {
  _id: string;
  film: IFilm;
  title: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
