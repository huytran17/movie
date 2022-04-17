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
  /**
   *
   * @description Update admin
   * @param param0
   * @param param1
   */
  async [ActionTypes.CREATE_SERIES]({ commit, state }, { user, film }) {
    const result = await this.$axios.$post(
      `/api/series/create-series/${user}/${film}`,
      {
        data: state.new_series,
      }
    );

    return result;
  },

  /**
   *
   * @description Update series
   * @param param0
   * @param param1
   */
  async [ActionTypes.UPDATE_SERIES]({ commit, state }, { series_id }) {
    const { data } = await this.$axios.$put(`/admin/series/${series_id}`, {
      data: state.series,
    });

    return data;
  },
  /**
   * @Description publish a series to show on mobile app
   * @param {is_published: boolean}
   */
  async [ActionTypes.DELETE_SERIES]({ commit }, { series_id }) {
    const result = await this.$axios.$delete(
      `/admin/series/delete/${series_id}`
    );

    return result;
  },
};

export default actions;