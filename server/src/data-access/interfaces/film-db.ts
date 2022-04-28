import Film from "../../entities/film";
import IFilm from "../../interfaces/film";
export default interface IFilmDb {
  findAll: () => Promise<Film[] | null>;
  findAllPaginated: ({
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
  findOne: () => Promise<Film | null>;
  findById: ({ id }: { id: string }) => Promise<Film | null>;
  findByTitle: ({ title }: { title: string }) => Promise<Film | null>;
  findBySlug: ({ slug }: { slug: string }) => Promise<Film | null>;
  insert: (payload: Partial<IFilm>) => Promise<Film | null>;
  delete: ({ id }: { id: string }) => Promise<Film | null>;
  hardDelete: ({ id }: { id: string }) => Promise<Film | null>;
  update: (updatePayload: Partial<IFilm>) => Promise<Film | null>;
  aggregateFilmCount: ({
    distance,
    unit,
  }: {
    distance?: number;
    unit?: string;
  }) => Promise<IGetFilmAnalyticsData | null>;
}

export interface PaginatedFilmResult {
  data: Film[];
  pagination: {
    current_page: number | null;
    from: number | null;
    to: number | null;
    per_page: number | null;
    total: number | null;
    total_pages: number | null;
  };
}
export interface IGetFilmAnalyticsData {
  formatted_dates: string[];
  counts: number[];
  total_cumulative_counts: number[];
}
