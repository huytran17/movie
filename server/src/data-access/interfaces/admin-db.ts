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
  insert: (payload: Partial<IAdmin>) => Promise<Admin | null>;
  findOne: () => Promise<Admin | null>;
  findById: ({ id }: { id: string }) => Promise<Admin | null>;
  findAll: () => Promise<Admin[] | null>;
}

export interface PaginatedAdminResult {
  data: Admin[];
  pagination: {
    current_page: number;
    from: number;
    to: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

export interface IGetAdminAnalyticsData {
  formatted_dates: string[];
  counts: number[];
  total_cumulative_counts: number[];
}
