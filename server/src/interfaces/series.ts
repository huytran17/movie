import IFilm from "./film";

export default interface ISeries {
  _id: string;
  film: IFilm;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
