import User from "../../entities/user";
import IUser from "../../interfaces/user";
export default interface IUserDb {
  findAll: () => Promise<User[] | null>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<PaginatedUserResult | null>;
  findOne: () => Promise<User | null>;
  findById: ({ id }: { id: string }) => Promise<User | null>;
  findBySlug: ({ slug }: { slug: string }) => Promise<User | null>;
  findByUsername: ({ username }: { username: string }) => Promise<User | null>;
  findByEmail: ({ email }: { email: string }) => Promise<User | null>;
  insert: (payload: Partial<IUser>) => Promise<User | null>;
  deleteByEmail: ({ email }: { email: string }) => Promise<User | null>;
  deleteById: ({ _id }: { _id: string }) => Promise<User | null>;
  delete: ({ id }: { id: string }) => Promise<User | null>;
  hardDeleteByEmail: ({ email }: { email: string }) => Promise<User | null>;
  hardDelete: ({ id }: { id: string }) => Promise<User | null>;
  update: (updatePayload: Partial<IUser>) => Promise<User | null>;
  aggregateUserCount: ({
    distance,
    unit,
  }: {
    distance?: number;
    unit?: string;
  }) => Promise<IGetUserAnalyticsData | null>;
}

export interface PaginatedUserResult {
  data: User[];
  pagination: {
    current_page: number | null;
    from: number | null;
    to: number | null;
    per_page: number | null;
    total: number | null;
    total_pages: number | null;
  };
}

export interface IGetUserAnalyticsData {
  formatted_dates: string[];
  counts: number[];
  total_cumulative_counts: number[];
}
