import _ from "lodash";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      feedback_loading: "feedback/loading",
      pagination: "feedback/pagination",
      feedbacks: "feedback/feedbacks",
      new_feedback: "feedback/new_feedback",
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
      GET_FEEDBACKS: "feedback/GET_FEEDBACKS",
      DELETE_FEEDBACK: "feedback/DELETE_FEEDBACK",
      CREATE_FEEDBACK: "feedback/CREATE_FEEDBACK",
      UPDATE_FEEDBACK: "feedback/UPDATE_FEEDBACK",
      GET_FEEDBACK_BY_FILM_ID: "feedback/GET_FEEDBACK_BY_FILM_ID",
    }),

    ...mapMutations({
      SET_LOADING: "feedback/SET_LOADING",
      UPDATE_NEW_FEEDBACK_DATA: "feedback/UPDATE_NEW_FEEDBACK_DATA",
    }),

    updateFeedbackObject({ data, variable_path }) {
      this.UPDATE_NEW_FEEDBACK_DATA({
        data,
        variable_path,
      });
    },
  },
};
