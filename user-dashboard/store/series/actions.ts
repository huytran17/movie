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
};

export default actions;
