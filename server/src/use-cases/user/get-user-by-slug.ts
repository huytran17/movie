import User from "../../entities/user";
import IUserDb from "../../data-access/interfaces/user-db";

export type IGetUserBySlug = ({ slug }: { slug: string }) => Promise<User | null>;

export default function makeGetUserBySlug(userDb: IUserDb): IGetUserBySlug {
  return async function getUserBySlug({ slug }: { slug: string }): Promise<User | null> {
    const user = await userDb.findBySlug({ slug });
    return user;
  };
}
