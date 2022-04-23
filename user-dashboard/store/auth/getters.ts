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
  has_user: (state) => state.has_user,
  is_edited: (state) => state.is_edited,
  security: (state) => state.security,
};

export default getters;
