import User from "../../entities/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type IGetUsers = () => Promise<User[] | null>;

export default function makeGetUsers(userDb: IUserDb): IGetUsers {
  return async function getUsers(): Promise<User[] | null> {
    const users = await userDb.findAll();
    return users;
  };
}
