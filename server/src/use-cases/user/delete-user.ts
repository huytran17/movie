import User from "../../entities/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type IDeleteUserById = ({
  email,
}: {
  email: string;
}) => Promise<User | null>;

export default function makeDeleteUser(userDb: IUserDb): IDeleteUserById {
  return async function deleteUser({
    email,
  }: {
    email: string;
  }): Promise<User | null> {
    const deletedUser = await userDb.deleteByEmail({ email });
    return deletedUser;
  };
}
