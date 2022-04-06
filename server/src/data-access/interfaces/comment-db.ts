import Comment from "../../entities/comment";
import IComment from "../../interfaces/comment";

export default interface ICommentDb {}

export interface PaginatedCommentResult {
  data: Comment[];
  pagination: {
    current_page: number;
    from: number;
    to: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}
