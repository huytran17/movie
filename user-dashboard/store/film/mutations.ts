import { MutationTypes } from "./mutation-type";
import { MutationTree } from "vuex";
import { FilmState } from "./index";
import _ from "lodash";

const mutations: MutationTree<FilmState> = {
  [MutationTypes.SET_FILM_DATA](
    state,
    { data, variable_path }: { data: Object | string; variable_path: string }
  ) {
    state.film = _.update(state.film, variable_path, (n) => {
      return data;
    });
  },
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

  [MutationTypes.SET_FILMS](state, { data, new_state = true }) {
    if (new_state) {
      state.films = data;
      return;
    }

    state.films = _.uniqBy(_.concat(state.films, data), "_id");
  },

  [MutationTypes.SET_FILM](state, { data }: { data: any }) {
    state.film = data;
  },

  [MutationTypes.SET_LOADING](state, { data }: { data: boolean }) {
    state.loading = data;
  },
};

export default mutations;
