import Feedback from "../../entities/feedback";
import IFeedback from "../../interfaces/feedback";

export default interface IFeedbackDb {
  findAll: () => Promise<Feedback[] | null>;
  insert: (payload: Partial<IFeedback>) => Promise<Feedback | null>;
  findById: ({ id }: { id: string }) => Promise<Feedback | null>;
  findAllByFilmId: ({
    film_id,
  }: {
    film_id: string;
  }) => Promise<Feedback[] | null>;
  update: (updatePayload: Partial<IFeedback>) => Promise<Feedback | null>;
  delete: ({ id }: { id: string }) => Promise<Feedback | null>;
}

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
