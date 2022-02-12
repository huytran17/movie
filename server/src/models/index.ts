import mongoose from "mongoose";
import userSchema from "../schemas/user";
import adminSchema from "../schemas/admin";

import IUser from "../interfaces/user";
import IAdmin from "../interfaces/admin";

type IUserModel = IUser & mongoose.Document;
type IAdminModel = IAdmin & mongoose.Document;

// Models
const UserModel = mongoose.model<IUserModel>("User", userSchema);
const AdminModel = mongoose.model<IAdminModel>("Admin", adminSchema);

export default Object.freeze({
  UserModel,
  AdminModel,
});

export { UserModel, AdminModel };
