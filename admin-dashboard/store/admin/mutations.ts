import { MutationTypes } from "./mutation-type";
import { MutationTree } from "vuex";
import { AdminState } from "./index";
import _ from "lodash";

const mutations: MutationTree<AdminState> = {
  /**
   * @description to set the jobs pagination
   * @param state
   * @param param1
   */
  [MutationTypes.SET_ADMINS_PAGINATION](
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

  [MutationTypes.SET_ADMINS](state, { admins }) {
    state.admins = admins;
  },

  [MutationTypes.SET_ADMIN](
    state,
    { index, user }: { index: number; user: any }
  ) {
    state.admins[index] = user;
  },

  [MutationTypes.SET_LOADING](state, { data }: { data: boolean }) {
    state.loading = data;
  },
};

export default mutations;
