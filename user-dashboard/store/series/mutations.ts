import { MutationTypes } from "./mutation-type";
import { MutationTree } from "vuex";
import { SeriesState } from "./index";
import _ from "lodash";

const mutations: MutationTree<SeriesState> = {
  /**
   * @description to set the jobs pagination
   * @param state
   * @param param1
   */
  [MutationTypes.SET_SERIES_PAGINATION](
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

  [MutationTypes.SET_SERIES_ARRAY](state, { data, new_state }) {
    if (new_state) {
      state.series_array = data;
      return;
    }

    state.series_array = _.uniqBy(_.concat(state.series_array, data), "_id");
  },

  [MutationTypes.SET_SERIES](state, { data }: { data: any }) {
    state.series = data;
  },

  [MutationTypes.SET_LOADING](state, { data }: { data: boolean }) {
    state.loading = data;
  },
};

export default mutations;
