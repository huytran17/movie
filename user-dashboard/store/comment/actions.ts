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
  async [ActionTypes.GET_COMMENTS_BY_FILM_ID]({ commit }, { film_id }) {
    const { data } = await this.$axios.$get(`/api/comment/by-film/${film_id}`);

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
   * @description Update api
   * @param param0
   * @param param1
   */
  async [ActionTypes.CREATE_COMMENT]({ commit, state }, { user, film }) {
    const result = await this.$axios.$post(
      `/api/comment/create-comment/${user}/${film}`,
      {
        data: state.new_comment,
      }
    );

    return result;
  },

  /**
   *
   * @description Update comment
   * @param param0
   * @param param1
   */
  async [ActionTypes.UPDATE_COMMENT]({ commit, state }, { comment_id }) {
    const { data } = await this.$axios.$put(`/api/comment/${comment_id}`, {
      data: state.new_comment,
    });

    return data;
  },

  async [ActionTypes.LIKE_COMMENT]({ commit }, { comment_id, user_id }) {
    const { data } = await this.$axios.$put(
      `/api/comment/like/${comment_id}/${user_id}`
    );

    return data;
  },
  /**
   * @Description publish a comment to show on mobile app
   * @param {is_published: boolean}
   */
  async [ActionTypes.DELETE_COMMENT]({ commit }, { comment_id }) {
    const result = await this.$axios.$delete(`/api/comment/${comment_id}`);

    return result;
  },
};

export default actions;
