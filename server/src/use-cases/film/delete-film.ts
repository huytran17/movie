import User from "../../entities/film";
import IUserDb from "../../data-access/interfaces/film-db";

export type IRemoveUser = ({ id }: { id: string }) => Promise<User | null>;

export default function makeRemoveUser(filmDb: IUserDb): IRemoveUser {
  return async function removeUser({
    id,
  }: {
    id: string;
  }): Promise<User | null> {
    const deletedUser = await filmDb.delete({ id });
    return deletedUser;
  };
}
