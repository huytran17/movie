import _ from "lodash";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      user_count_analytics: "analytics/user_count_analytics",
      film_count_analytics: "analytics/film_count_analytics",
      admin_count_analytics: "analytics/admin_count_analytics",
      user_cumulative_count_analytics:
        "analytics/user_cumulative_count_analytics",
      film_cumulative_count_analytics:
        "analytics/film_cumulative_count_analytics",
      admin_cumulative_count_analytics:
        "analytics/admin_cumulative_count_analytics",
      user_date_count_analytics: "analytics/user_date_count_analytics",
      film_date_count_analytics: "analytics/film_date_count_analytics",
      admin_date_count_analytics: "analytics/admin_date_count_analytics",
      loading: "analytics/loading",
    }),
  },
  methods: {
    ...mapActions({
      GET_USER_ANALYTICS: "analytics/GET_USER_ANALYTICS",
      GET_FILM_ANALYTICS: "analytics/GET_FILM_ANALYTICS",
      GET_ADMIN_ANALYTICS: "analytics/GET_ADMIN_ANALYTICS",
    }),

    ...mapMutations({
      SET_USER_ANALYTICS_LOADING: "analytics/SET_USER_ANALYTICS_LOADING",
      SET_FILM_ANALYTICS_LOADING: "analytics/SET_FILM_ANALYTICS_LOADING",
      SET_ADMIN_ANALYTICS_LOADING: "analytics/SET_ADMIN_ANALYTICS_LOADING",
    }),
  },
};
