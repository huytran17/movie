import Post from "../../entities/post";
import IPost from "../../interfaces/post";

export default interface IPostDb {}

export interface PaginatedPostResult {
  data: Post[];
  pagination: {
    current_page: number;
    from: number;
    to: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}
