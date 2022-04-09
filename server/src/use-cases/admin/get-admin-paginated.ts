import IAdminDb, {
  PaginatedAdminResult,
} from "../../data-access/interfaces/admin-db";

export type IGetAdminsPaginated = ({
  query,
  page,
  entries_per_page,
}: {
  query: string;
  page: number;
  entries_per_page?: number;
}) => Promise<PaginatedAdminResult | null>;

export default function makeGetAdminsPaginated(
  adminDb: IAdminDb
): IGetAdminsPaginated {
  return async function getAdminsPaginated({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }): Promise<PaginatedAdminResult | null> {
    const admins = await adminDb.findAllPaginated({
      query,
      page,
      entries_per_page,
    });
    return admins;
  };
}
