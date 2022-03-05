import User from "../../entities/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type IGetUserById = ({ id }: { id: string }) => Promise<User | null>;

export default function makeGetUserById(userDb: IUserDb): IGetUserById {
  return async function getUserById({ id }: { id: string }): Promise<User | null> {
    const user = await userDb.findById({ id });
    return user;
  };
}
