import { ActionTypes } from "./action-type";
import { MutationTypes } from "./mutation-type";
import { ActionTree } from "vuex";
import { CommentState } from "./index";
import { RootState } from "../index";
import _ from "lodash";

const actions: ActionTree<CommentState, RootState> = {
  /**
   * @description Get all comments
   * @param param0
   */
  async [ActionTypes.GET_COMMENTS]({ commit }) {
    const { data } = await this.$axios.$get(`/api/comment`);

    commit(MutationTypes.SET_COMMENTS, { comments: data });
    return data;
  },
  /**
   * @description Get single comment, the chosen comment state is used in payment.
   * @param param0
   */
  async [ActionTypes.GET_COMMENT]({ commit }, { comment_id }) {
    let { data } = await this.$axios.$get(`/api/comment/${comment_id}`);
    commit(MutationTypes.SET_COMMENT, { data });

    return data;
  },
  /**
   *
   * @description Update admin
   * @param param0
   * @param param1
   */
  async [ActionTypes.CREATE_COMMENT]({ commit, state }) {
    const result = await this.$axios.$post(`/admin/comment/create-comment`, {
      data: state.new_comment,
    });

    return result;
  },

  /**
   *
   * @description Update comment
   * @param param0
   * @param param1
   */
  async [ActionTypes.UPDATE_COMMENT]({ commit, state }, { comment_id }) {
    const { data } = await this.$axios.$put(`/admin/comment/${comment_id}`, {
      data: state.comment,
    });

    return data;
  },
  /**
   * @Description publish a comment to show on mobile app
   * @param {is_published: boolean}
   */
  async [ActionTypes.DELETE_COMMENT]({ commit }, { comment_id }) {
    const result = await this.$axios.$delete(
      `/admin/comment/delete/${comment_id}`
    );

    return result;
  },
};

export default actions;
