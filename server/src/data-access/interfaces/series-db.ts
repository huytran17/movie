import Series from "../../entities/series";
import ISeries from "../../interfaces/series";
export default interface ISeriesDb {
  findAll: () => Promise<Series[] | null>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<PaginatedSeriesResult | null>;
  findOne: () => Promise<Series | null>;
  findById: ({ id }: { id: string }) => Promise<Series | null>;
  findByFilmId: ({ film_id }: { film_id: string }) => Promise<Series | null>;
  insert: (payload: Partial<ISeries>) => Promise<Series | null>;
  delete: ({ id }: { id: string }) => Promise<Series | null>;
  hardDelete: ({ id }: { id: string }) => Promise<Series | null>;
  update: (updatePayload: Partial<ISeries>) => Promise<Series | null>;
}

export interface PaginatedSeriesResult {
  data: Series[];
  pagination: {
    current_page: number | null;
    from: number | null;
    to: number | null;
    per_page: number | null;
    total: number | null;
    total_pages: number | null;
  };
}
export interface IGetSeriesAnalyticsData {
  formatted_dates: string[];
  counts: number[];
  total_cumulative_counts: number[];
}
