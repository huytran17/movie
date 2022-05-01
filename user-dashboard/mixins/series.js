import _ from "lodash";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      titleRules: [(v) => !!v || this.$t("Title is required.")],
    };
  },
  computed: {
    ...mapGetters({
      series_loading: "series/loading",
      pagination: "series/pagination",
      series: "series/series",
      series_array: "series/series_array",
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
    }),

    ...mapMutations({
      SET_LOADING: "series/SET_LOADING",
      SET_SERIES_DATA: "series/SET_SERIES_DATA",
    }),
  },
};
