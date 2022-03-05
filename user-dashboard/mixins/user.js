import _ from "lodash";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      loading: "user/loading",
      pagination: "user/pagination",
      has_user: "auth/has_user",
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
      GET_USERS: "user/GET_USERS",
      GET_USER: "user/GET_USER",
      GET_USER_BY_SLUG: "user/GET_USER_BY_SLUG",
    }),

    ...mapMutations({
      SET_LOADING: "user/SET_LOADING",
    }),
  },
};
