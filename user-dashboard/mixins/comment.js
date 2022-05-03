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
      edit_comment: "comment/edit_comment",
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
      GET_COMMENTS_BY_FILM_ID: "comment/GET_COMMENTS_BY_FILM_ID",
      GET_COMMENT: "comment/GET_COMMENT",
      CREATE_COMMENT: "comment/CREATE_COMMENT",
      UPDATE_COMMENT: "comment/UPDATE_COMMENT",
      DELETE_COMMENT: "comment/DELETE_COMMENT",
      LIKE_COMMENT: "comment/LIKE_COMMENT",
      REPLY_COMMENT: "comment/REPLY_COMMENT",
    }),

    ...mapMutations({
      SET_LOADING: "comment/SET_LOADING",
      UPDATE_NEW_COMMENT_DATA: "comment/UPDATE_NEW_COMMENT_DATA",
      SET_COMMENT: "comment/SET_COMMENT",
      UPDATE_COMMENT_DATA: "comment/UPDATE_COMMENT_DATA",
      UPDATE_EDIT_COMMENT_DATA: "comment/UPDATE_EDIT_COMMENT_DATA",
    }),

    updateNewCommentObject({ data, variable_path }) {
      this.UPDATE_NEW_COMMENT_DATA({
        data,
        variable_path,
      });
    },

    updateEditCommentObject({ data, variable_path }) {
      this.UPDATE_EDIT_COMMENT_DATA({
        data,
        variable_path,
      });
    },

    updateCommentObject({ data, variable_path }) {
      this.UPDATE_COMMENT_DATA({
        data,
        variable_path,
      });
    },
  },
};
