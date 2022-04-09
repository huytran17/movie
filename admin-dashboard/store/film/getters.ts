import { GetterTree } from "vuex";
import { RootState } from "../index";
import { FilmState } from "./index";
import _ from "lodash";

export const getters: GetterTree<FilmState, RootState> = {
  prefix() {
    return "/user";
  },
  films: (state) => state.films,
  pagination: (state) => state.pagination,
  loading: (state) => state.loading,
};

export default getters;
