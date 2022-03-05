export const state = () => ({
  pagination: {
    current_page: 1,
    per_page: 15,
    total: 0,
  },
  users: [] as any[],
  loading: false,
});

export type UserState = ReturnType<typeof state>;
