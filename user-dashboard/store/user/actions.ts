import { ActionTree } from "vuex";
import { RootState } from "../index";
import { UserState } from "./index";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import _ from "lodash";

export const actions: ActionTree<UserState, RootState> = {
  /**
   *
   * @param param0
   * @param param1
   * @returns get users paginated
   */
  async [ActionTypes.GET_USERS_PAGINATED]({ commit }, { params = {} }) {
    try {
      const query = _.get(params, "query", undefined);
      const page = _.get(params, "page", 1);
      const new_state = _.get(params, "new_state", true);

      let url_query = new URLSearchParams(`page=${page}`);

      if (query) {
        url_query.set("query", query);
      }

      const users = await this.$axios.$get(`/api/users/paginated?${url_query}`);

      commit(MutationTypes.SET_USERS_PAGINATED, { data: users, new_state });

      return users;
    } catch (error) {
      console.log(error);
    }
  },
};
