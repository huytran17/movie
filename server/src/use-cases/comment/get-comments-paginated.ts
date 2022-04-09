import ICommentDb, {
  PaginatedCommentResult,
} from "../../data-access/interfaces/comment-db";

export type IGetCommentsPaginated = ({
  query,
  page,
  entries_per_page,
}: {
  query: string;
  page: number;
  entries_per_page?: number;
}) => Promise<PaginatedCommentResult | null>;

export default function makeGetCommentsPaginated(
  commentDb: ICommentDb
): IGetCommentsPaginated {
  return async function getCommentsPaginated({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }): Promise<PaginatedCommentResult | null> {
    const comments = await commentDb.findAllPaginated({
      query,
      page,
      entries_per_page,
    });
    return comments;
  };
}
