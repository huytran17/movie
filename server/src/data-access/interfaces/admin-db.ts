import Admin from "../../entities/admin";
import IAdmin from "../../interfaces/admin";

export default interface IAdminDb {
  aggregateAdminCount: ({
    distance,
    unit,
  }: {
    distance?: number;
    unit?: string;
  }) => Promise<IGetAdminAnalyticsData | null>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<PaginatedAdminResult | null>;
  insert: (payload: Partial<IAdmin>) => Promise<Admin | null>;
  findOne: () => Promise<Admin | null>;
  findById: ({ id }: { id: string }) => Promise<Admin | null>;
  findAll: () => Promise<Admin[] | null>;
  update: (updatePayload: Partial<IAdmin>) => Promise<Admin | null>;
  delete: ({ id }: { id: string }) => Promise<Admin | null>;
}

export interface PaginatedAdminResult {
  data: Admin[];
  pagination: {
    current_page: number | null;
    from: number | null;
    to: number | null;
    per_page: number | null;
    total: number | null;
    total_pages: number | null;
  };
}

export interface IGetAdminAnalyticsData {
  formatted_dates: string[];
  counts: number[];
  total_cumulative_counts: number[];
}
