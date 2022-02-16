export const state = () => ({
  is_loading: false,
  users: [] as any,
  user: {},
  pagination: {
    current_page: 1,
    per_page: 15,
    total: 0,
  },
});

export type UserState = ReturnType<typeof state>;
