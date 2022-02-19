import { ActionTypes } from "./action-types";
import { ActionTree } from "vuex";
import { AuthState } from "./index";
import { RootState } from "../index";
import { MutationTypes } from "./mutation-types";

const actions: ActionTree<AuthState, RootState> = {
  [ActionTypes.LOGIN]({ state }) {
    try {
      const result = this.$axios.$post("/api/auth/login", {
        data: state.login_data,
      });
    } catch (err) {
      console.error(err);
    }
  },
};

export default actions;
