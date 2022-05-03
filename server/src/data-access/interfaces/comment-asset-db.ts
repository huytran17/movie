import CommentAsset from "../../entities/comment-asset";
import ICommentAsset from "../../interfaces/comment-asset";

export type ICommentAssetData = {
  parent: string;
  children: string[];
};

export default interface ICommentAssetDb {
  findAll: () => Promise<CommentAsset[] | null>;
  findAllPaginated: ({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page?: number;
  }) => Promise<PaginatedCommentAssetResult | null>;
  findByCommentId: ({ id }: { id: string }) => Promise<CommentAsset | null>;
  findById: ({ id }: { id: string }) => Promise<CommentAsset | null>;
  insert: (payload: ICommentAssetData) => Promise<CommentAsset | null>;
  delete: ({ id }: { id: string }) => Promise<CommentAsset | null>;
  hardDelete: ({ id }: { id: string }) => Promise<CommentAsset | null>;
  update: (
    updatePayload: Partial<ICommentAsset>
  ) => Promise<CommentAsset | null>;
}

export interface PaginatedCommentAssetResult {
  data: CommentAsset[];
  pagination: {
    current_page: number | null;
    from: number | null;
    to: number | null;
    per_page: number | null;
    total: number | null;
    total_pages: number | null;
  };
}
