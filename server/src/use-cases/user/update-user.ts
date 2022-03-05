import User from "../../entities/user";
import IUserDb from "../../data-access/interfaces/user-db";
import IUser from "../../interfaces/user";
import { ClientSession } from "mongoose";
import _ from "lodash";

interface IUpdateUserData {
  userDetails: Partial<IUser>;
  update_password?: boolean;
}
export type IUpdateUser = ({
  userDetails,
  update_password,
}: IUpdateUserData) => Promise<User | null>;

export default function makeUpdateUser(userDb: IUserDb): IUpdateUser {
  return async function updateUser({
    userDetails,
    update_password = false,
  }: IUpdateUserData): Promise<User | null> {
    const { email } = userDetails;

    if (!email) {
      throw new Error(`Email cannot be undefined.`);
    }

    const [existing_by_email, existing_by_id] = await Promise.all([
      userDb.findByEmail({ email }),
      userDb.findById({ id: userDetails._id as string }),
    ]);
    const existing = existing_by_id || existing_by_email;

    if (!existing) {
      throw new RangeError("User not found.");
    }

    const omit_list = ["_id", "email", "type", "tnc_accepted_at"];
    if (!update_password) {
      omit_list.push("hash_password");
    }
    const final_user_detail = _.omit(userDetails, omit_list);
    const user = new User(
      Object.assign({}, existing, final_user_detail, {
        updated_at: new Date(),
        email_verified_at: userDetails.email_verified_at ? new Date() : null,
      })
    );

    const updatedUser = await userDb.update(user);
    return updatedUser;
  };
}
