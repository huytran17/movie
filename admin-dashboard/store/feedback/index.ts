export const state = () => ({
  pagination: {
    current_page: 1,
    per_page: 15,
    total: 0,
  },
  feedbacks: [] as any[],
  loading: false,
});

export type FeedbackState = ReturnType<typeof state>;
