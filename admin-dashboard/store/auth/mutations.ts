import { MutationTree } from "vuex";
import { AuthState } from "./index";
import { MutationTypes } from "./mutation-types";
import _ from "lodash";

const mutations: MutationTree<AuthState> = {
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

  /**
   * update user state
   * @param state
   * @param param1
   */
  [MutationTypes.UPDATE_USER_STATE](
    state,
    { data, variable_path }: { data: Object | string; variable_path: string }
  ) {
    state.user = _.update(state.user, variable_path, (n) => {
      return data;
    });
    state.is_edited = true;
  },
};

export default mutations;
