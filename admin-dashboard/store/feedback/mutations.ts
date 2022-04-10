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
};

export default mutations;
