export const state = () => ({
  pagination: {
    current_page: 1,
    per_page: 15,
    total: 0,
  },
  comment_assets: [] as any[],
  loading: false,
  comment_asset: {},
});

export type CommentAssetState = ReturnType<typeof state>;
