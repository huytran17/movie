import { GetterTree } from "vuex";
import { AuthState } from "./index";
import { RootState } from "../index";

export const getters: GetterTree<AuthState, RootState> = {
  prefix() {
    return "/auth";
  },
  user: (state) => state.user,
  login_data: (state) => state.login_data,
  register_data: (state) => state.register_data,
};

export default getters;
