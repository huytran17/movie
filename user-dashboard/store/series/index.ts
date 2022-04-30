export const state = () => ({
  pagination: {
    current_page: 1,
    per_page: 15,
    total: 0,
  },
  series_array: [] as any[],
  loading: false,
  series: {},
});

export type SeriesState = ReturnType<typeof state>;
