import { ActionTypes } from "./action-types";
import { ActionTree } from "vuex";
import { AuthState } from "./index";
import { RootState } from "../index";
import { MutationTypes } from "./mutation-types";

const actions: ActionTree<AuthState, RootState> = {
  /**
   * @description Get total cumlative created users count
   * @param param0
   */
  async [ActionTypes.GET_USER_ANALYTICS]({ commit }) {
    const { data } = await this.$axios.$get(
      `/admin/analytics/user-analytics/`,
      {
        params: { distance: 1, unit: "year" },
      }
    );

    commit(MutationTypes.SET_USER_COUNT_ANALYTICS, {
      data: data.counts,
    });
    commit(MutationTypes.SET_USER_CUMULATIVE_COUNT_ANALYTICS, {
      data: data.total_cumulative_counts,
    });
    commit(MutationTypes.SET_USER_DATE_COUNT_ANALYTICS, {
      data: data.formatted_dates,
    });
    return data;
  },

  /**
   * @description Get total cumlative created films count
   * @param param0
   */
  async [ActionTypes.GET_FILM_ANALYTICS]({ commit }) {
    const { data } = await this.$axios.$get(
      `/admin/analytics/film-analytics/`,
      {
        params: { distance: 1, unit: "year" },
      }
    );

    commit(MutationTypes.SET_FILM_ACOUNT_NALYTICS, {
      data: data.counts,
    });
    commit(MutationTypes.SET_FILM_COMULATIVE_ACOUNT_ANALYTICS, {
      data: data.total_cumulative_counts,
    });
    commit(MutationTypes.SET_FILM_DATE_ACOUNT_NALYTICS, {
      data: data.formatted_dates,
    });
    return data;
  },

  /**
   * @description Get total cumlative created films count
   * @param param0
   */
  async [ActionTypes.GET_ADMIN_ANALYTICS]({ commit }) {
    const { data } = await this.$axios.$get(
      `/admin/analytics/admin-analytics/`,
      {
        params: { distance: 1, unit: "year" },
      }
    );

    commit(MutationTypes.SET_ADMIN_COUNT_ANALYTICS, {
      data: data.counts,
    });
    commit(MutationTypes.SET_ADMIN_CUMULATIVE_COUNT_ANALYTICS, {
      data: data.total_cumulative_counts,
    });
    commit(MutationTypes.SET_ADMIN_DATE_COUNT_ANALYTICS, {
      data: data.formatted_dates,
    });
    return data;
  },
};

export default actions;
