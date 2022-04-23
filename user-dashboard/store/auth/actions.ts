import { ActionTypes } from "./action-types";
import { ActionTree } from "vuex";
import { AuthState } from "./index";
import { RootState } from "../index";
import { MutationTypes } from "./mutation-types";

const actions: ActionTree<AuthState, RootState> = {
  async [ActionTypes.UPDATE_USER_SECURITY](
    { commit },
    { security_data, user_id }
  ) {
    const { data, is_error, message } = await this.$axios.$put(
      `/api/auth/security/${user_id}`,
      { data: security_data }
    );
    if (!is_error) {
      commit(MutationTypes.SET_USER, { data });
    }
    return { data, is_error, message };
  },
  /**
   * login
   * @param param0
   */
  async [ActionTypes.SIGN_IN]({ commit, state }) {
    try {
      const response = await this.$axios.$post("/api/auth/sign-in", {
        data: state.sign_in_data,
      });

      if (response.user && response.access_token) {
        commit(MutationTypes.SET_HAS_USER, { data: true });
        commit(MutationTypes.SET_USER, { data: response.user });
      }

      return response;
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
   * login
   * @param param0
   */
  async [ActionTypes.AUTO_SIGN_IN]({ commit, state }) {
    try {
      const { user, is_error } = await this.$axios.$get(
        "/api/auth/auto-sign-in"
      );

      if (user) {
        commit(MutationTypes.SET_HAS_USER, { data: true });
        commit(MutationTypes.SET_USER, { data: user });
      }

      return { user, is_error };
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

  /**
   * @description get myself as a user
   * @param param0
   */
  async [ActionTypes.ME]({ commit }) {
    try {
      const { data: user } = await this.$axios.$get("/api/auth/");

      if (!user) {
        localStorage.removeItem("access_token");
        commit(MutationTypes.SET_HAS_USER, { data: false });
        throw new Error("user is not valid");
      }
      commit(MutationTypes.SET_USER, { data: user });
      commit(MutationTypes.SET_HAS_USER, { data: true });
      return user;
    } catch (err) {
      localStorage.removeItem("access_token");
      commit(MutationTypes.SET_HAS_USER, { data: false });
      throw err;
    }
  },
};

export default actions;
