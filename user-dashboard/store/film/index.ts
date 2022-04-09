export const state = () => ({
  pagination: {
    current_page: 1,
    per_page: 15,
    total: 0,
  },
  films: [] as any[],
  loading: false,
  film: {},
});

export type FilmState = ReturnType<typeof state>;
