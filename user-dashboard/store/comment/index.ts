export const state = () => ({
  pagination: {
    current_page: 1,
    per_page: 15,
    total: 0,
  },
  comments: [] as any[],
  loading: false,
  comment: {},
  new_comment: {
    content: "",
  },
});

export type CommentState = ReturnType<typeof state>;
