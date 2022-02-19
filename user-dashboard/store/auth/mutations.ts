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
};

export default mutations;
