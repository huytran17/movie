import ICommentAssetDb, {
  PaginatedCommentAssetResult,
} from "../../data-access/interfaces/comment-asset-db";

export type IGetCommentAssetPaginated = ({
  query,
  page,
  entries_per_page,
}: {
  query: string;
  page: number;
  entries_per_page?: number;
}) => Promise<PaginatedCommentAssetResult | null>;

export default function makeGetCommentAssetPaginated(
  commentAssetDb: ICommentAssetDb
): IGetCommentAssetPaginated {
  return async function getCommentAssetPaginated({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }): Promise<PaginatedCommentAssetResult | null> {
    const comment_asset = await commentAssetDb.findAllPaginated({
      query,
      page,
      entries_per_page,
    });
    return comment_asset;
  };
}
