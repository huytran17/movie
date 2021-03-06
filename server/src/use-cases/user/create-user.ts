import User from "../../entities/user";
import IUser from "../../interfaces/user";
import IUserDb from "../../data-access/interfaces/user-db";
import { ClientSession } from "mongoose";

export interface ICreateUserData {
  userDetails: Omit<IUser, "_id">;
}

export type ICreateUser = ({
  userDetails,
}: ICreateUserData) => Promise<User | null>;

export default function makeCreateUser(userDb: IUserDb): ICreateUser {
  return async function createsUser({
    userDetails,
  }: ICreateUserData): Promise<User | null> {
    const exists = await userDb.findByEmail({ email: userDetails.email });

    if (exists) {
      return exists;
    }

    const createdUser = await userDb.insert(userDetails);

    return createdUser;
  };
}
