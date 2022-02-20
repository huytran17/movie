import { GetterTree } from "vuex";
import { AuthState } from "./index";
import { RootState } from "../index";

export const getters: GetterTree<AuthState, RootState> = {
  prefix() {
    return "/auth";
  },
  user: (state) => state.user,
  sign_in_data: (state) => state.sign_in_data,
  sign_up_data: (state) => state.sign_up_data,
};

export default getters;
