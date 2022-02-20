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
  [MutationTypes.SET_LOGIN_DATA](
    state,
    { data, path }: { data: object; path: string }
  ) {
    const updated_data = _.update(state.login_data, path, (n) => {
      return data;
    });

    state.login_data = updated_data;
  },
  /**
   * set sign up data
   * @param state
   * @param param1
   */
  [MutationTypes.SET_SIGN_UP_DATA](
    state,
    { data, path }: { data: object; path: string }
  ) {
    const updated_data = _.update(state.sign_up_data, path, (n) => {
      return data;
    });

    state.sign_up_data = updated_data;

    console.log("--------------", state.sign_up_data);
  },
};

export default mutations;
