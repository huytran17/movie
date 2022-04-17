import ISeriesDb, {
  PaginatedSeriesResult,
} from "../../data-access/interfaces/series-db";

export type IGetSeriesPaginated = ({
  query,
  page,
  entries_per_page,
}: {
  query: string;
  page: number;
  entries_per_page?: number;
}) => Promise<PaginatedSeriesResult | null>;

export default function makeGetSeriesPaginated(
  seriesDb: ISeriesDb
): IGetSeriesPaginated {
  return async function getSeriesPaginated({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }): Promise<PaginatedSeriesResult | null> {
    const series = await seriesDb.findAllPaginated({
      query,
      page,
      entries_per_page,
    });
    return series;
  };
}
