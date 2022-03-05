import User from "../../entities/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type IRemoveUser = ({ email }: { email: string }) => Promise<User | null>;

export default function makeRemoveUser(userDb: IUserDb): IRemoveUser {
  return async function removeUser({ email }: { email: string }): Promise<User | null> {
    const deletedUser = await userDb.deleteByEmail({ email });
    return deletedUser;
  };
}
