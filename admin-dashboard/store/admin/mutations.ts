import { MutationTypes } from "./mutation-type";
import { MutationTree } from "vuex";
import { AdminState } from "./index";
import _ from "lodash";

const mutations: MutationTree<AdminState> = {
  [MutationTypes.UPDATE_SECURITY_DATA](
    state,
    { data, variable_path }: { data: Object | string; variable_path: string }
  ) {
    state.security = _.update(state.security, variable_path, (n) => {
      return data;
    });
  },
  [MutationTypes.UPDATE_ADMIN_DATA](
    state,
    { data, variable_path }: { data: Object | string; variable_path: string }
  ) {
    state.admin = _.update(state.admin, variable_path, (n) => {
      return data;
    });
  },
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

  /**
   * set user
   * @param state
   * @param param1
   */
  [MutationTypes.SET_ADMIN](state, { data }: { data: boolean }) {
    state.admin = data;
  },

  [MutationTypes.SET_LOADING](state, { data }: { data: boolean }) {
    state.loading = data;
  },
};

export default mutations;
