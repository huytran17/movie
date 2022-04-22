export const state = () => ({
  pagination: {
    current_page: 1,
    per_page: 15,
    total: 0,
  },
  admins: [] as any[],
  loading: false,
  admin: {},
  security: {},
});

export type AdminState = ReturnType<typeof state>;
