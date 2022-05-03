import { GetterTree } from "vuex";
import { RootState } from "../index";
import { CommentState } from "./index";
import _ from "lodash";

export const getters: GetterTree<CommentState, RootState> = {
  prefix() {
    return "/comment";
  },
  comments: (state) => state.comments,
  pagination: (state) => state.pagination,
  loading: (state) => state.loading,
  comment: (state) => state.comment,
  new_comment: (state) => state.new_comment,
  edit_comment: (state) => state.edit_comment,
};

export default getters;
