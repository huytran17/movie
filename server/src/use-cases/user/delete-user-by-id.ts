import User from "../../entities/user";
import IUserDb from "../../data-access/interfaces/user-db";
import { ClientSession } from "mongoose";

export type IDeleteUserById = ({ id }: { id: string }) => Promise<User | null>;

export default function makeDeleteUserById(userDb: IUserDb): IDeleteUserById {
  return async function deleteUserById({
    id,
  }: {
    id: string;
  }): Promise<User | null> {
    const deletedUser = await userDb.delete({ id });
    return deletedUser;
  };
}
