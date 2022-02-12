import mongoose from "mongoose";
import userSchema from "../schemas/user";

import IUser from "../interfaces/user";

type IUserModel = IUser & mongoose.Document;

// Models
const UserModel = mongoose.model<IUserModel>("User", userSchema);

export default Object.freeze({
  UserModel,
});

export { UserModel };
