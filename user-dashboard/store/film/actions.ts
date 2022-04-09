import { ActionTypes } from "./action-type";
import { MutationTypes } from "./mutation-type";
import { ActionTree } from "vuex";
import { FilmState } from "./index";
import { RootState } from "../index";
import _ from "lodash";

const actions: ActionTree<FilmState, RootState> = {
  /**
   * @description Get all films
   * @param param0
   */
  async [ActionTypes.GET_FILMS]({ commit }) {
    const { data } = await this.$axios.$get(`/api/film`);

    commit(MutationTypes.SET_FILMS, { films: data });
    return data;
  },
  /**
   * @description Get single film, the chosen film state is used in payment.
   * @param param0
   */
  async [ActionTypes.GET_FILM]({ commit }, { film_id }) {
    let { data } = await this.$axios.$get(`/api/film/${film_id}`);
    commit(MutationTypes.SET_FILM, { data });

    return data;
  },
};

export default actions;
