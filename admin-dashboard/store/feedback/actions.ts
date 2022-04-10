import { ActionTypes } from "./action-type";
import { MutationTypes } from "./mutation-type";
import { ActionTree } from "vuex";
import { FeedbackState } from "./index";
import { RootState } from "../index";
import _ from "lodash";

const actions: ActionTree<FeedbackState, RootState> = {
  /**
   * @Description publish a user to show on mobile app
   * @param {is_published: boolean}
   */
  async [ActionTypes.PUBLISH_FEEDBACK](
    { commit },
    { feedback_id, is_published }
  ) {
    const result = await this.$axios.$post(`/admin/feedback/publish`, {
      feedback_id,
      is_published,
    });

    return result;
  },

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
   * @Description publish a feedback to show on mobile app
   * @param {is_published: boolean}
   */
  async [ActionTypes.DELETE_FEEDBACK]({ commit }, { feedback_id }) {
    const result = await this.$axios.$delete(
      `/admin/feedback/delete/${feedback_id}`
    );

    return result;
  },
};

export default actions;
