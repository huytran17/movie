import { GetterTree } from "vuex";
import { AuthState } from "./index";
import { RootState } from "../index";

export const getters: GetterTree<AuthState, RootState> = {
  prefix() {
    return "/auth";
  },
  user: (state) => state.user,
};

export default getters;
