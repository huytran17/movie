import User from "../../entities/user";
import IUserDb from "../../data-access/interfaces/user-db";
import { ClientSession } from "mongoose";

export type IRemoveUserById = ({ id }: { id: string }) => Promise<User | null>;

export default function makeRemoveUserById(userDb: IUserDb): IRemoveUserById {
  return async function removeUserById({
    id,
  }: {
    id: string;
  }): Promise<User | null> {
    const deletedUser = await userDb.delete({ id });
    return deletedUser;
  };
}
