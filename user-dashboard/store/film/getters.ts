import { GetterTree } from "vuex";
import { RootState } from "../index";
import { FilmState } from "./index";
import _ from "lodash";

export const getters: GetterTree<FilmState, RootState> = {
  prefix() {
    return "/film";
  },
  films: (state) => state.films,
  films_exclude_series: (state) => state.films_exclude_series,
  pagination: (state) => state.pagination,
  loading: (state) => state.loading,
  film: (state) => state.film,
  popular_films: (state) =>
    _.orderBy(state.films_exclude_series, ["meta.view_count"], ["desc"]),
  newest_films: (state) =>
    _.orderBy(state.films_exclude_series, ["created_at"], ["desc"]),
};

export default getters;
