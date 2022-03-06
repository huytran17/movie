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
  async [ActionTypes.SIGN_IN]({ commit, state }) {
    try {
      const { user, access_token } = await this.$axios.$post(
        "/api/auth/sign-in",
        {
          data: state.sign_in_data,
        }
      );

      if (user && access_token) {
        commit(MutationTypes.SET_HAS_USER, { data: true });
        commit(MutationTypes.SET_USER, { data: user });
      }

      return { access_token, user };
    } catch (err) {
      console.error(err);
    }
  },

  /**
   * login
   * @param param0
   */
  async [ActionTypes.VERIFY]({ commit, state }) {
    try {
      const { user } = await this.$axios.$get("/api/auth/verify");

      if (user) {
        commit(MutationTypes.SET_HAS_USER, { data: true });
        commit(MutationTypes.SET_USER, { data: user });
      }

      return user;
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
