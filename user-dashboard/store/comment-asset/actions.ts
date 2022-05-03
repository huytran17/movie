import { ActionTypes } from "./action-type";
import { MutationTypes } from "./mutation-type";
import { ActionTree } from "vuex";
import { CommentAssetState } from "./index";
import { RootState } from "../index";
import _ from "lodash";

const actions: ActionTree<CommentAssetState, RootState> = {
  async [ActionTypes.GET_COMMENT_ASSETS_BY_FILM_ID]({ commit }, { film_id }) {
    const { data } = await this.$axios.$get(
      `/api/comment-asset/by-film/${film_id}`
    );

    const filtered_data = _.map(data, (comment_asset: any) => {
      comment_asset.children = _.filter(
        comment_asset.children,
        (child) => child.deleted_at === null || child.deleted_at === undefined
      );

      return comment_asset;
    });

    commit(MutationTypes.SET_COMMENT_ASSETS, { comment_assets: filtered_data });
    return data;
  },
};

export default actions;
