import _ from "lodash";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      firstNameRules: [
        (v) => !!v || "First name is required",
        (v) =>
          (v && v.length <= 255) ||
          "First name must be less than 255 characters.",
      ],
      lastNameRules: [
        (v) => !!v || "Last name is required",
        (v) =>
          (v && v.length <= 255) ||
          "Last name must be less than 255 characters.",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid.",
      ],
      membershipLevelRules: [
        (v) =>
          (v && v > 0) || "Membership Level must be equal or greater than 1.",
      ],
    };
  },
  computed: {
    ...mapGetters({
      loading: "user/loading",
      pagination: "user/pagination",
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
      UPDATE_USER: "user/UPDATE_USER",
      UPDATE_USER_AVATAR: "user/UPDATE_USER_AVATAR",
    }),

    ...mapMutations({
      SET_LOADING: "user/SET_LOADING",
    }),
  },
};
