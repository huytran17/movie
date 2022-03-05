import User from "../../entities/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type IGetUserByUsername = ({ username }: { username: string }) => Promise<User | null>;

export default function makeGetUserByUsername(userDb: IUserDb): IGetUserByUsername {
  return async function getUserByUsername({ username }: { username: string }): Promise<User | null> {
    const user = await userDb.findByUsername({ username });
    return user;
  };
}
