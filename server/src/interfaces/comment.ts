import IUser from "./user";
import IFilm from "./film";
import User from "../entities/user";

export default interface IComment {
  _id: string;
  content: string;
  user: IUser;
  film: IFilm;
  meta: {
    liked_by: User[];
  };
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
