import moment from "moment";
import { AdminModel } from "../../models";
import Admin from "../../entities/admin";

export default interface IAdminDb {}

export interface PaginatedUserResult {
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
