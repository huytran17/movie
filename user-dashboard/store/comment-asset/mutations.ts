import { MutationTypes } from "./mutation-type";
import { MutationTree } from "vuex";
import { CommentAssetState } from "./index";
import _ from "lodash";

const mutations: MutationTree<CommentAssetState> = {
  /**
   * @description to set the jobs pagination
   * @param state
   * @param param1
   */
  [MutationTypes.SET_COMMENT_ASSETS_PAGINATION](
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

  [MutationTypes.SET_COMMENT_ASSETS](state, { comment_assets }) {
    state.comment_assets = comment_assets;
  },

  [MutationTypes.SET_COMMENT_ASSET](state, { data }: { data: any }) {
    state.comment_asset = data;
  },

  [MutationTypes.SET_LOADING](state, { data }: { data: boolean }) {
    state.loading = data;
  },
};

export default mutations;
