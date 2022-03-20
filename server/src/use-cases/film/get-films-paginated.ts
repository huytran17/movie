import IFilmDb, {
  PaginatedFilmResult,
} from "../../data-access/interfaces/film-db";

export type IGetFilmsPaginated = ({
  query,
  page,
  entries_per_page,
}: {
  query: string;
  page: number;
  entries_per_page?: number;
}) => Promise<PaginatedFilmResult | null>;

export default function makeGetFilmsPaginated(
  filmDb: IFilmDb
): IGetFilmsPaginated {
  return async function getFilmsPaginated({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }): Promise<PaginatedFilmResult | null> {
    const films = await filmDb.findAllPaginated({
      query,
      page,
      entries_per_page,
    });
    return films;
  };
}
