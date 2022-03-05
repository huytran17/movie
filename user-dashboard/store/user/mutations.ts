import { MutationTypes } from "./mutation-type";
import { MutationTree } from "vuex";
import { UserState } from "./index";
import _ from "lodash";

const mutations: MutationTree<UserState> = {
  /**
   * @description to set the jobs pagination
   * @param state
   * @param param1
   */
  [MutationTypes.SET_USERS_PAGINATION](
    state,
    {
      data,
    }: {
      data: {
        current_page: number;
        from: null | number;
        to: null | number;
        per_page: number;
        total: number;
      };
    }
  ) {
    state.pagination = data;
  },

  [MutationTypes.SET_USERS](state, { users }) {
    state.users = users;
  },

  [MutationTypes.SET_USER](
    state,
    { index, user }: { index: number; user: any }
  ) {
    state.users[index] = user;
  },

  [MutationTypes.SET_LOADING](state, { data }: { data: boolean }) {
    state.loading = data;
  },
};

export default mutations;
