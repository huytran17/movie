import { GetterTree } from "vuex";
import { RootState } from "../index";
import { UserState } from "./index";

export const getters: GetterTree<UserState, RootState> = {
  prefix() {
    return "/user";
  },

  users: (state) => state.users,
  user: (state) => state.user,
  pagination: (state) => state.pagination,
  is_loading: (state) => state.is_loading,
};

export default getters;
