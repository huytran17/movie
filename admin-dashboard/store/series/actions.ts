import { ActionTypes } from "./action-type";
import { MutationTypes } from "./mutation-type";
import { ActionTree } from "vuex";
import { SeriesState } from "./index";
import { RootState } from "../index";
import _ from "lodash";

const actions: ActionTree<SeriesState, RootState> = {
  async [ActionTypes.UPDATE_SERIES_THUMBNAIL]({ commit }, { file, series_id }) {
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data, is_error, message } = await this.$axios.$post(
      `/admin/series/upload-thumbnail/${series_id}`,
      formData,
      config
    );
    if (!is_error) {
      commit(MutationTypes.SET_SERIES, { data });
    }

    return { data, is_error, message };
  },
  /**
   * @description Get all series
   * @param param0
   */
  async [ActionTypes.GET_SERIES_ARRAY]({ commit }) {
    const { data } = await this.$axios.$get(`/admin/series`);

    commit(MutationTypes.SET_SERIES_ARRAY, { series: data });
    return data;
  },
  /**
   * @description Get single series, the chosen series state is used in payment.
   * @param param0
   */
  async [ActionTypes.GET_SERIES]({ commit }, { series_id }) {
    let { data } = await this.$axios.$get(`/admin/series/${series_id}`);
    commit(MutationTypes.SET_SERIES, { data });

    return data;
  },
  /**
   *
   * @description Update admin
   * @param param0
   * @param param1
   */
  async [ActionTypes.CREATE_SERIES]({ commit, state }) {
    const { data, is_error, message } = await this.$axios.$post(
      `/admin/series/create-series`,
      {
        data: state.new_series,
      }
    );

    return { data, is_error, message };
  },

  /**
   *
   * @description Update series
   * @param param0
   * @param param1
   */
  async [ActionTypes.UPDATE_SERIES]({ commit, state }, { series_id }) {
    const { data, is_error, message } = await this.$axios.$put(
      `/admin/series/${series_id}`,
      {
        data: state.series,
      }
    );

    return { data, is_error, message };
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
