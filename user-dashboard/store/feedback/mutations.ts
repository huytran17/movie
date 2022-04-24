import { MutationTypes } from "./mutation-type";
import { MutationTree } from "vuex";
import { FeedbackState } from "./index";
import _ from "lodash";

const mutations: MutationTree<FeedbackState> = {
  /**
   * @description to set the jobs pagination
   * @param state
   * @param param1
   */
  [MutationTypes.SET_FEEDBACKS_PAGINATION](
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

  [MutationTypes.SET_FEEDBACKS](state, { feedbacks }) {
    state.feedbacks = feedbacks;
  },

  [MutationTypes.SET_LOADING](state, { data }: { data: boolean }) {
    state.loading = data;
  },

  [MutationTypes.SET_FEEDBACK](state, { data }: { data: any }) {
    state.feedback = data;
  },

  /**
   * update user state
   * @param state
   * @param param1
   */
  [MutationTypes.UPDATE_NEW_FEEDBACK_DATA](
    state,
    { data, variable_path }: { data: Object | string; variable_path: string }
  ) {
    state.new_feedback = _.update(state.new_feedback, variable_path, (n) => {
      return data;
    });
  },

  [MutationTypes.SET_EDIT_FEEDBACK_DATA](
    state,
    { data, variable_path }: { data: Object | string; variable_path: string }
  ) {
    state.feedback = _.update(state.feedback, variable_path, (n) => {
      return data;
    });
  },
};

export default mutations;
