import { GetterTree } from "vuex";
import { RootState } from "../index";
import { FeedbackState } from "./index";
import _ from "lodash";

export const getters: GetterTree<FeedbackState, RootState> = {
  prefix() {
    return "/user";
  },
  feedbacks: (state) => state.feedbacks,
  loading: (state) => state.loading,
  new_feedback: (state) => state.new_feedback,
  feedback: (state) => state.feedback,
};

export default getters;
