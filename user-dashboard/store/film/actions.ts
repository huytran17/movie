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

    commit(MutationTypes.SET_FILMS, { data });
    return data;
  },
  /**
   * @description Get all films
   * @param param0
   */
  async [ActionTypes.GET_FILMS_PAGINATED]({ commit }, params = {}) {
    const query = _.get(params, "query");
    const page = _.get(params, "page", 1);
    const new_state = _.get(params, "new_state", false);
    const entries_per_page = _.get(params, "entries_per_page", 15);
    const series = _.get(params, "series");
    const category = _.get(params, "category");
    const keep_in_store = _.get(params, "keep_in_store", true);
    const exclude_ids = _.get(params, "exclude_ids", []);

    let url_query = `?page=${page}`;

    if (entries_per_page) {
      url_query += `&entries_per_page=${entries_per_page}`;
    }

    if (query) {
      url_query += `&query=${query}`;
    }

    if (exclude_ids) {
      url_query += `&exclude_ids=${exclude_ids}`;
    }

    if (series) {
      url_query += `&series=${series}`;
    }

    if (category) {
      url_query += `&category=${category}`;
    }

    const { data: films, pagination } = await this.$axios.$get(
      `/api/film/films/all-paginated/${url_query}`
    );

    if (!keep_in_store) {
      return { data: films, pagination };
    }

    commit(MutationTypes.SET_FILMS, {
      data: films,
      new_state,
    });

    commit(MutationTypes.SET_FILMS_PAGINATION, {
      data: pagination,
    });

    commit(MutationTypes.SET_LOADING, {
      data: false,
    });
    return { data: films, pagination };
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
