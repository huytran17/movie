import _ from "lodash";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      feedbackContentRules: [
        (v) => !!v || "Feedback content is required",
        (v) =>
          (v && v.length <= 255) ||
          "Feedback content must be less than 255 characters.",
      ],
    };
  },
  computed: {
    ...mapGetters({
      feedback_loading: "feedback/loading",
      pagination: "feedback/pagination",
      feedbacks: "feedback/feedbacks",
      new_feedback: "feedback/new_feedback",
      feedback: "feedback/feedback",
      user: "auth/user",
    }),

    /**
     * @description pages_exists will return true
     * @returns boolean
     */
    pages_exists() {
      return !!_.get(this.pagination, "total_pages");
    },

    can_not_feedback() {
      const user_can_not_feedbacked = _.some(
        this.feedbacks,
        (feedback) => feedback.user && feedback.user._id === this.user._id
      );
      return user_can_not_feedbacked;
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
      SET_EDIT_FEEDBACK_DATA: "feedback/SET_EDIT_FEEDBACK_DATA",
      SET_FEEDBACK: "feedback/SET_FEEDBACK",
    }),

    updateNewFeedbackObject({ data, variable_path }) {
      this.UPDATE_NEW_FEEDBACK_DATA({
        data,
        variable_path,
      });
    },

    updateFeedbackObject({ data, variable_path }) {
      this.SET_EDIT_FEEDBACK_DATA({
        data,
        variable_path,
      });
    },
  },
};
