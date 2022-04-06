import IUser from "./user";
import IFilm from "./film";

export default interface IComment {
  _id: string;
  content: string;
  user: IUser;
  film: IFilm;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
