import { GetterTree } from "vuex";
import { RootState } from "../index";
import { FilmState } from "./index";
import _ from "lodash";

export const getters: GetterTree<FilmState, RootState> = {
  prefix() {
    return "/film";
  },
  films: (state) => state.films,
  pagination: (state) => state.pagination,
  loading: (state) => state.loading,
  film: (state) => state.film,
  popular_films: (state) =>
    _.orderBy(state.films, ["meta.view_count"], ["desc"]),
  newest_films: (state) => _.orderBy(state.films, ["created_at"], ["desc"]),
};

export default getters;
