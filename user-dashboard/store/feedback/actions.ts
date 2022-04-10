import { ActionTypes } from "./action-type";
import { MutationTypes } from "./mutation-type";
import { ActionTree } from "vuex";
import { FeedbackState } from "./index";
import { RootState } from "../index";
import _ from "lodash";

const actions: ActionTree<FeedbackState, RootState> = {
  /**
   * @description Get all feedbacks
   * @param param0
   */
  async [ActionTypes.GET_FEEDBACKS]({ commit }) {
    const { data } = await this.$axios.$get(`/admin/feedback`);

    commit(MutationTypes.SET_FEEDBACKS, { feedbacks: data });
    return data;
  },

  /**
   * @description Get feedbacks by film id
   * @param param0
   */
  async [ActionTypes.GET_FEEDBACK_BY_FILM_ID]({ commit }, { film_id }) {
    const { data } = await this.$axios.$get(`/admin/feedback/${film_id}`);

    commit(MutationTypes.SET_FEEDBACKS, { feedbacks: data });
    return data;
  },

  /**
   * @Description publish a feedback to show on mobile app
   * @param {is_published: boolean}
   */
  async [ActionTypes.DELETE_FEEDBACK]({ commit }, { feedback_id }) {
    const result = await this.$axios.$delete(
      `/admin/feedback/delete/${feedback_id}`
    );

    return result;
  },

  /**
   *
   * @description Update admin
   * @param param0
   * @param param1
   */
  async [ActionTypes.CREATE_FEEDBACK]({ commit, state }, { user, film }) {
    const result = await this.$axios.$post(
      `/api/feedback/create-feedback/${user}/${film}`,
      {
        data: state.new_feedback,
      }
    );

    return result;
  },

  /**
   *
   * @description Update feedback
   * @param param0
   * @param param1
   */
  async [ActionTypes.UPDATE_FEEDBACK]({ commit, state }, { feedback_id }) {
    const { data } = await this.$axios.$put(`/admin/feedback/${feedback_id}`, {
      data: state.feedback,
    });

    return data;
  },
};

export default actions;
