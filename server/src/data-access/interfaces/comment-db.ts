import Comment from "../../entities/comment";
import IComment from "../../interfaces/comment";
export default interface ICommentDb {
  findAll: () => Promise<Comment[] | null>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<PaginatedCommentResult | null>;
  findOne: () => Promise<Comment | null>;
  findById: ({ id }: { id: string }) => Promise<Comment | null>;
  insert: (payload: Partial<IComment>) => Promise<Comment | null>;
  delete: ({ id }: { id: string }) => Promise<Comment | null>;
  hardDelete: ({ id }: { id: string }) => Promise<Comment | null>;
  update: (updatePayload: Partial<IComment>) => Promise<Comment | null>;
}

export interface PaginatedCommentResult {
  data: Comment[];
  pagination: {
    current_page: number | null;
    from: number | null;
    to: number | null;
    per_page: number | null;
    total: number | null;
    total_pages: number | null;
  };
}
export interface IGetCommentAnalyticsData {
  formatted_dates: string[];
  counts: number[];
  total_cumulative_counts: number[];
}
