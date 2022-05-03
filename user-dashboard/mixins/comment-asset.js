import _ from "lodash";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      comment_asset_loading: "comment-asset/loading",
      pagination: "comment-asset/pagination",
      comment_assets: "comment-asset/comment_assets",
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
      GET_COMMENT_ASSETS_BY_FILM_ID:
        "comment-asset/GET_COMMENT_ASSETS_BY_FILM_ID",
    }),

    ...mapMutations({
      SET_LOADING: "comment-asset/SET_LOADING",
    }),
  },
};
