import { MutationTree } from "vuex";
import { UserState } from "./index";
import { MutationTypes } from "./mutation-types";
import _ from "lodash";

const mutations: MutationTree<UserState> = {
  /**
   *
   * @param state
   * @param param1
   * @returns set users paginated
   */
  [MutationTypes.SET_USERS_PAGINATED](
    state,
    { data, new_state }: { data: any[]; new_state: boolean }
  ) {
    if (new_state) {
      state.users = data;
      return;
    }

    state.users = _.uniqBy(_.concat(state.users, data), "_id");
  },
  /**
   * @description set is loading
   * @param state
   * @param param1
   */
  [MutationTypes.SET_LOADING](state, { data }: { data: boolean }) {
    state.is_loading = data;
  },

  /**
   * set user pagination
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
};

export default mutations;
