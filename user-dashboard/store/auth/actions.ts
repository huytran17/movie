import { ActionTypes } from "./action-types";
import { ActionTree } from "vuex";
import { AuthState } from "./index";
import { RootState } from "../index";
import { MutationTypes } from "./mutation-types";

const actions: ActionTree<AuthState, RootState> = {
  /**
   * login
   * @param param0
   */
  async [ActionTypes.SIGN_IN]({ state }) {
    try {
      const access_token = await this.$axios.$post("/api/auth/sign-in", {
        data: state.sign_in_data,
      });

      return access_token;
    } catch (err) {
      console.error(err);
    }
  },

  /**
   * sign up
   * @param param0
   */
  async [ActionTypes.SIGN_UP]({ state }) {
    try {
      const response = await this.$axios.$post("/api/auth/sign-up", {
        data: state.sign_up_data,
      });

      return response;
    } catch (err) {
      console.error(err);
    }
  },
};

export default actions;
