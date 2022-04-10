import _ from "lodash";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      feedback_loading: "feedback/loading",
      pagination: "feedback/pagination",
      feedbacks: "feedback/feedbacks",
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
      PUBLISH_FEEDBACK: "feedback/PUBLISH_FEEDBACK",
      HARD_DELETE_FEEDBACK: "feedback/HARD_DELETE_FEEDBACK",
    }),

    ...mapMutations({
      SET_LOADING: "feedback/SET_LOADING",
    }),
  },
};
