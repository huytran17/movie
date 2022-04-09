import { MutationTypes } from "./mutation-type";
import { MutationTree } from "vuex";
import { CommentState } from "./index";
import _ from "lodash";

const mutations: MutationTree<CommentState> = {
  /**
   * @description to set the jobs pagination
   * @param state
   * @param param1
   */
  [MutationTypes.SET_COMMENTS_PAGINATION](
    state,
    {
      data,
    }: {
      data: {
        current_page: number;
        from: null | number;
        to: null | number;
        per_page: number;
        total: number;
      };
    }
  ) {
    state.pagination = data;
  },

  [MutationTypes.SET_COMMENTS](state, { comments }) {
    state.comments = comments;
  },

  [MutationTypes.SET_COMMENT](state, { data }: { data: any }) {
    state.comment = data;
  },

  [MutationTypes.SET_LOADING](state, { data }: { data: boolean }) {
    state.loading = data;
  },
};

export default mutations;
