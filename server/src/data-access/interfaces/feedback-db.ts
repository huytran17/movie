import Feedback from "../../entities/feedback";
import IFeedback from "../../interfaces/feedback";

export default interface IFeedbackDb {}

export interface PaginatedFeedbackResult {
  data: Feedback[];
  pagination: {
    current_page: number;
    from: number;
    to: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}
