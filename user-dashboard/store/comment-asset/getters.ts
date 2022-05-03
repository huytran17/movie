import { GetterTree } from "vuex";
import { RootState } from "../index";
import { CommentAssetState } from "./index";
import _ from "lodash";

export const getters: GetterTree<CommentAssetState, RootState> = {
  prefix() {
    return "/comment-asset";
  },
  comment_assets: (state) => state.comment_assets,
  pagination: (state) => state.pagination,
  loading: (state) => state.loading,
  comment_asset: (state) => state.comment_asset,
};

export default getters;
