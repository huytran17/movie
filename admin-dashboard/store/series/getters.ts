import { GetterTree } from "vuex";
import { RootState } from "../index";
import { SeriesState } from "./index";
import _ from "lodash";

export const getters: GetterTree<SeriesState, RootState> = {
  prefix() {
    return "/series";
  },
  series_array: (state) => state.series_array,
  pagination: (state) => state.pagination,
  loading: (state) => state.loading,
  series: (state) => state.series,
  new_series: (state) => state.new_series,
};

export default getters;
