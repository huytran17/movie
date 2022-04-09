import { MutationTypes } from "./mutation-type";
import { MutationTree } from "vuex";
import { FilmState } from "./index";
import _ from "lodash";

const mutations: MutationTree<FilmState> = {
  /**
   * @description to set the jobs pagination
   * @param state
   * @param param1
   */
  [MutationTypes.SET_FILMS_PAGINATION](
    state,
    {
      data,
    }: {
      data: {
        current_page: number;
        from: null | number;
        to: null | number;
        per_page: number;
        total: number;
      };
    }
  ) {
    state.pagination = data;
  },

  [MutationTypes.SET_FILMS](state, { films }) {
    state.films = films;
  },

  [MutationTypes.SET_FILM](state, { data }: { data: any }) {
    state.film = data;
  },

  [MutationTypes.SET_LOADING](state, { data }: { data: boolean }) {
    state.loading = data;
  },
};

export default mutations;
