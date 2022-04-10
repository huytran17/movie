import _ from "lodash";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      comment_loading: "comment/loading",
      pagination: "comment/pagination",
      comments: "comment/comments",
      comment: "comment/comment",
      new_comment: "comment/new_comment",
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
      GET_COMMENTS: "comment/GET_COMMENTS",
      GET_COMMENT: "comment/GET_COMMENT",
      CREATE_COMMENT: "comment/CREATE_COMMENT",
      UPDATE_COMMENT: "comment/UPDATE_COMMENT",
      DELETE_COMMENT: "comment/DELETE_COMMENT",
    }),

    ...mapMutations({
      SET_LOADING: "comment/SET_LOADING",
      UPDATE_NEW_COMMENT_DATA: "comment/UPDATE_NEW_COMMENT_DATA",
    }),

    updateCommentObject({ data, variable_path }) {
      this.UPDATE_NEW_COMMENT_DATA({
        data,
        variable_path,
      });

      console.log(this.new_comment);
    },
  },
};
