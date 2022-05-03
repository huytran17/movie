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

    commit(MutationTypes.SET_COMMENT_ASSETS, { comment_assets: data });
    return data;
  },
};

export default actions;
