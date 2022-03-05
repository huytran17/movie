import IUserDb, {
  PaginatedUserResult,
} from "../../data-access/interfaces/user-db";

export type IGetUsersPaginated = ({
  query,
  page,
  entries_per_page,
}: {
  query: string;
  page: number;
  entries_per_page?: number;
}) => Promise<PaginatedUserResult | null>;

export default function makeGetUsersPaginated(
  userDb: IUserDb
): IGetUsersPaginated {
  return async function getUsersPaginated({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }): Promise<PaginatedUserResult | null> {
    const users = await userDb.findAllPaginated({
      query,
      page,
      entries_per_page,
    });
    return users;
  };
}
