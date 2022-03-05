import { GetterTree } from "vuex";
import { RootState } from "../index";
import { UserState } from "./index";
import _ from "lodash";

export const getters: GetterTree<UserState, RootState> = {
  prefix() {
    return "/user";
  },
  users: (state) => state.users,
  pagination: (state) => state.pagination,
  loading: (state) => state.loading,
};

export default getters;
