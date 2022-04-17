import _ from "lodash";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      series_loading: "series/loading",
      pagination: "series/pagination",
      series: "series/series",
      series_array: "series/series_array",
      new_series: "series/new_series",
    }),

    /**
     * @description pages_exists will return true
     * @returns boolean
     */
    pages_exists() {
      return !!_.get(this.pagination, "total_pages");
    },
  },
  methods: {
    ...mapActions({
      GET_SERIES: "series/GET_SERIES",
      GET_SERIES_ARRAY: "series/GET_SERIES_ARRAY",
      CREATE_SERIES: "series/CREATE_SERIES",
      UPDATE_SERIES: "series/UPDATE_SERIES",
      DELETE_SERIES: "series/DELETE_SERIES",
    }),

    ...mapMutations({
      SET_LOADING: "series/SET_LOADING",
      UPDATE_NEW_SERIES_DATA: "series/UPDATE_NEW_SERIES_DATA",
    }),

    updateSeriesObject({ data, variable_path }) {
      this.UPDATE_NEW_SERIES_DATA({
        data,
        variable_path,
      });
    },
  },
};
