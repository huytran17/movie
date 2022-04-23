import _ from "lodash";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      birthdayRules: [(v) => !!v || this.$t("Birthday is required.")],
    };
  },
  computed: {
    ...mapGetters({
      user_loading: "user/loading",
      pagination: "user/pagination",
      users: "user/users",
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
      DELETE_USER: "user/DELETE_USER",
      CREATE_USER: "user/CREATE_USER",
    }),

    ...mapMutations({
      SET_LOADING: "user/SET_LOADING",
    }),
  },
};
