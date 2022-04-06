import IUser from "./user";
import IFilm from "./film";

export default interface IFeedback {
  _id: string;
  content: string;
  user: IUser;
  film: IFilm;
  star_count: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
