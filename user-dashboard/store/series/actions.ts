import { ActionTypes } from "./action-type";
import { MutationTypes } from "./mutation-type";
import { ActionTree } from "vuex";
import { SeriesState } from "./index";
import { RootState } from "../index";
import _ from "lodash";

const actions: ActionTree<SeriesState, RootState> = {
  /**
   * @description Get all series
   * @param param0
   */
  async [ActionTypes.GET_SERIES_ARRAY]({ commit }) {
    const { data } = await this.$axios.$get(`/api/series`);

    commit(MutationTypes.SET_SERIES_ARRAY, { series: data });
    return data;
  },
  /**
   * @description Get single series, the chosen series state is used in payment.
   * @param param0
   */
  async [ActionTypes.GET_SERIES]({ commit }, { series_id }) {
    let { data } = await this.$axios.$get(`/api/series/${series_id}`);
    commit(MutationTypes.SET_SERIES, { data });

    return data;
  },

  async [ActionTypes.GET_SERIES_ARRAY_PAGINATED]({ commit }, params = {}) {
    const query = _.get(params, "query");
    const page = _.get(params, "page", 1);
    const new_state = _.get(params, "new_state", false);
    const entries_per_page = _.get(params, "entries_per_page", 15);
    const keep_in_store = _.get(params, "keep_in_store", true);

    let url_query = `?page=${page}`;

    if (entries_per_page) {
      url_query += `&entries_per_page=${entries_per_page}`;
    }

    if (query) {
      url_query += `&query=${query}`;
    }

    const { data: films, pagination } = await this.$axios.$get(
      `/api/series/all-paginated/${url_query}`
    );

    if (!keep_in_store) {
      return { data: films, pagination };
    }

    commit(MutationTypes.SET_SERIES_ARRAY, {
      data: films,
      new_state,
    });

    commit(MutationTypes.SET_SERIES_PAGINATION, {
      data: pagination,
    });

    commit(MutationTypes.SET_LOADING, {
      data: false,
    });
    return { data: films, pagination };
  },
};

export default actions;
