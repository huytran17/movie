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
};

export default getters;
