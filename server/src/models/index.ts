import mongoose from "mongoose";
import userSchema from "../data-access/schemas/user";
import adminSchema from "../data-access/schemas/admin";
import filmSchema from "../data-access/schemas/film";

import IUser from "../interfaces/user";
import IAdmin from "../interfaces/admin";
import IFilm from "../interfaces/film";

type IUserModel = IUser & mongoose.Document;
type IAdminModel = IAdmin & mongoose.Document;
type IFilmModel = IFilm & mongoose.Document;

// Models
const UserModel = mongoose.model<IUserModel>("User", userSchema);
const AdminModel = mongoose.model<IAdminModel>("Admin", adminSchema);
const FilmModel = mongoose.model<IFilmModel>("Film", filmSchema);

export default Object.freeze({
  UserModel,
  AdminModel,
  FilmModel,
});

export { UserModel, AdminModel, FilmModel };
