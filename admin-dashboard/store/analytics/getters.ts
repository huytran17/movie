import { GetterTree } from "vuex";
import { AuthState } from "./index";
import { RootState } from "../index";

export const getters: GetterTree<AuthState, RootState> = {
  prefix() {
    return "/auth";
  },
  user: (state) => state.user,
  sign_in_data: (state) => state.sign_in_data,
  sign_up_data: (state) => state.sign_up_data,
  has_user: (state) => state.has_user,
  user_count_analytics: (state) => state.user_count_analytics,
  film_count_analytics: (state) => state.film_count_analytics,
  admin_count_analytics: (state) => state.admin_count_analytics,
  user_cumulative_count_analytics: (state) =>
    state.user_cumulative_count_analytics,
  film_cumulative_count_analytics: (state) =>
    state.film_cumulative_count_analytics,
  admin_cumulative_count_analytics: (state) =>
    state.admin_cumulative_count_analytics,
  user_date_count_analytics: (state) => state.user_date_count_analytics,
  film_date_count_analytics: (state) => state.film_date_count_analytics,
  admin_date_count_analytics: (state) => state.admin_date_count_analytics,
  loading: (state) => state.loading,
};

export default getters;
