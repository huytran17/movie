import { MutationTree } from "vuex";
import { AuthState } from "./index";
import { MutationTypes } from "./mutation-types";
import _ from "lodash";

const mutations: MutationTree<AuthState> = {
  /**
   * @description set the array of users created dates
   */
  [MutationTypes.SET_USER_COUNT_ANALYTICS](state, { data }: { data: [] }) {
    state.user_count_analytics = data;
  },
  /**
   * @description set the array of users created dates
   */
  [MutationTypes.SET_FILM_COUNT_ANALYTICS](state, { data }: { data: [] }) {
    state.film_count_analytics = data;
  },
  /**
   * @description set the array of users created dates
   */
  [MutationTypes.SET_ADMIN_COUNT_ANALYTICS](state, { data }: { data: [] }) {
    state.admin_count_analytics = data;
  },

  /**
   * @description set the array of users created dates
   */
  [MutationTypes.SET_USER_CUMULATIVE_COUNT_ANALYTICS](
    state,
    { data }: { data: [] }
  ) {
    state.user_cumulative_count_analytics = data;
  },
  /**
   * @description set the array of users created dates
   */
  [MutationTypes.SET_FILM_CUMULATIVE_COUNT_ANALYTICS](
    state,
    { data }: { data: [] }
  ) {
    state.film_cumulative_count_analytics = data;
  },
  /**
   * @description set the array of users created dates
   */
  [MutationTypes.SET_ADMIN_CUMULATIVE_COUNT_ANALYTICS](
    state,
    { data }: { data: [] }
  ) {
    state.admin_cumulative_count_analytics = data;
  },

  /**
   * @description set the array of users created dates
   */
  [MutationTypes.SET_USER_DATE_COUNT_ANALYTICS](state, { data }: { data: [] }) {
    state.user_date_count_analytics = data;
  },
  /**
   * @description set the array of users created dates
   */
  [MutationTypes.SET_FILM_DATE_COUNT_ANALYTICS](state, { data }: { data: [] }) {
    state.film_date_count_analytics = data;
  },
  /**
   * @description set the array of users created dates
   */
  [MutationTypes.SET_ADMIN_DATE_COUNT_ANALYTICS](
    state,
    { data }: { data: [] }
  ) {
    state.admin_date_count_analytics = data;
  },
  /**
   * set login data
   * @param state
   * @param param1
   */
  [MutationTypes.SET_SIGN_IN_DATA](
    state,
    { data, path }: { data: any; path: string }
  ) {
    const updated_data = _.update(state.sign_in_data, path, (n) => {
      return data;
    });

    state.sign_in_data = updated_data;
  },
  /**
   * set has user
   * @param state
   * @param param1
   */
  [MutationTypes.SET_HAS_USER](state, { data }: { data: boolean }) {
    state.has_user = data;
  },

  /**
   * set has user
   * @param state
   * @param param1
   */
  [MutationTypes.SET_LOADING](state, { data }: { data: boolean }) {
    state.chart_loading = data;
  },

  /**
   * set user
   * @param state
   * @param param1
   */
  [MutationTypes.SET_USER](state, { data }: { data: boolean }) {
    state.user = data;
  },
  /**
   * set sign up data
   * @param state
   * @param param1
   */
  [MutationTypes.SET_SIGN_UP_DATA](
    state,
    { data, path }: { data: any; path: string }
  ) {
    const updated_data = _.update(state.sign_up_data, path, (n) => {
      return data;
    });

    state.sign_up_data = updated_data;
  },
};

export default mutations;
