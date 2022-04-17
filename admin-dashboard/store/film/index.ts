export const state = () => ({
  pagination: {
    current_page: 1,
    per_page: 15,
    total: 0,
  },
  films: [] as any[],
  loading: false,
  new_film: {
    title: "",
    description: "",
    meta: {
      manufactured_at: new Date(Date.now()).toISOString().substr(0, 10),
      released_at: new Date(Date.now()).toISOString().substr(0, 10),
    },
  },
  film: {},
});

export type FilmState = ReturnType<typeof state>;
