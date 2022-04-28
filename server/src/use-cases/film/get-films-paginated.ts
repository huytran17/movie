import IFilmDb, {
  PaginatedFilmResult,
} from "../../data-access/interfaces/film-db";

export type IGetFilmsPaginated = ({
  query,
  page,
  entries_per_page,
  category,
  series,
}: {
  query: string;
  page: number;
  entries_per_page?: number;
  category?: string;
  series?: string;
}) => Promise<PaginatedFilmResult | null>;

export default function makeGetFilmsPaginated(
  filmDb: IFilmDb
): IGetFilmsPaginated {
  return async function getFilmsPaginated({
    query,
    page,
    entries_per_page,
    category,
    series,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
    category?: string;
    series?: string;
  }): Promise<PaginatedFilmResult | null> {
    const films = await filmDb.findAllPaginated({
      query,
      page,
      entries_per_page,
      category,
      series,
    });
    return films;
  };
}
