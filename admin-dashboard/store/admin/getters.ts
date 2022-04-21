import { GetterTree } from "vuex";
import { RootState } from "../index";
import { AdminState } from "./index";
import _ from "lodash";

export const getters: GetterTree<AdminState, RootState> = {
  prefix() {
    return "/user";
  },
  admins: (state) => state.admins,
  pagination: (state) => state.pagination,
  loading: (state) => state.loading,
  admin: (state) => state.admin,
};

export default getters;
