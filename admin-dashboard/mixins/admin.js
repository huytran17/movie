import _ from "lodash";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      typeRules: [(v) => !!v || this.$t("Type is required.")],
      birthdayRules: [(v) => !!v || this.$t("Birthday is required.")],
      addressRules: [
        (v) => !!v || this.$t("Address is required."),
        (v) =>
          (v && v.length > 19) || this.$t("Address must be min 20 characters."),
      ],
      phoneNumberRules: [
        (v) => !!v || this.$t("Phone number is required."),
        (v) =>
          (v && /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(v)) ||
          this.$t("Phone number must have valid format."),
      ],
      oldPasswordRules: [
        (v) => !!v || this.$t("Password is required."),
        (v) =>
          (v && v.length > 7) || this.$t("Password must be min 8 characters."),
      ],
      firstNameRules: [
        (v) => !!v || this.$t("First name is required."),
        (v) =>
          (v && v.length > 1) ||
          this.$t("First name must be min 2 characters."),
      ],
      lastNameRules: [
        (v) => !!v || this.$t("Last name is required."),
        (v) =>
          (v && v.length > 1) || this.$t("Last name must be min 2 characters."),
      ],
      emailRules: [
        (v) => !!v || this.$t("E-mail is required."),
        (v) => /.+@.+\..+/.test(v) || this.$t("E-mail must be valid."),
      ],
      newPasswordConfirmationRules: [
        (v) =>
          (v && v.length > 7) || this.$t("Password must be min 8 characters."),
        (v) =>
          this.security.password === v ||
          this.$t("Confirm Password must match Password."),
      ],
      newPasswordRules: [
        (v) => !!v || this.$t("Password is required."),
        (v) =>
          (v && v.length > 7) || this.$t("Password must be min 8 characters."),
      ],
    };
  },
  computed: {
    ...mapGetters({
      admin_loading: "admin/loading",
      pagination: "admin/pagination",
      admins: "admin/admins",
      admin: "admin/admin",
      security: "admin/security",
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
      GET_ADMINS: "admin/GET_ADMINS",
      GET_ADMIN: "admin/GET_ADMIN",
      DELETE_ADMIN: "admin/DELETE_ADMIN",
      PUBLISH_ADMIN: "admin/PUBLISH_ADMIN",
      HARD_DELETE_ADMIN: "admin/HARD_DELETE_ADMIN",
      UPDATE_ADMIN_AVATAR: "admin/UPDATE_ADMIN_AVATAR",
      UPDATE_ADMIN: "admin/UPDATE_ADMIN",
      CREATE_ADMIN: "admin/CREATE_ADMIN",
      RESTORE_ADMIN: "admin/RESTORE_ADMIN",
      UPDATE_ADMIN_SECURITY: "admin/UPDATE_ADMIN_SECURITY",
    }),

    ...mapMutations({
      SET_LOADING: "admin/SET_LOADING",
      UPDATE_SECURITY_DATA: "admin/UPDATE_SECURITY_DATA",
      UPDATE_ADMIN_DATA: "admin/UPDATE_ADMIN_DATA",
    }),

    updateSecurityObject({ variable_path, data }) {
      this.UPDATE_SECURITY_DATA({
        variable_path,
        data,
      });
    },
  },
};
