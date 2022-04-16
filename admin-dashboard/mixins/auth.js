import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      emailRules: [
        (v) => !!v || this.$t("E-mail is required."),
        (v) => /.+@.+\..+/.test(v) || this.$t("E-mail must be valid."),
      ],
      passwordRules: [
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
      passwordConfirmationRules: [
        (v) =>
          (v && v.length > 7) || this.$t("Password must be min 8 characters."),
        (v) =>
          this.sign_up_data.password === v ||
          this.$t("Confirm Password must match Password."),
      ],
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      has_user: "auth/has_user",
      sign_in_data: "auth/sign_in_data",
      sign_up_data: "auth/sign_up_data",
    }),

    is_super_admin() {
      const super_admin_type = _.get(this.user, "type", "");
      const is_super_admin_tpye = super_admin_type === "super";
      return is_super_admin_tpye;
    },
  },
  methods: {
    ...mapActions({
      SIGN_IN: "auth/SIGN_IN",
      SIGN_UP: "auth/SIGN_UP",
      VERIFY: "auth/VERIFY",
      AUTO_SIGN_IN: "auth/AUTO_SIGN_IN",
      GET_ME: "auth/ME",
    }),

    ...mapMutations({
      SET_USER: "auth/SET_USER",
      SET_SIGN_IN_DATA: "auth/SET_SIGN_IN_DATA",
      SET_SIGN_UP_DATA: "auth/SET_SIGN_UP_DATA",
      UPDATE_USER_STATE: "auth/UPDATE_USER_STATE",
    }),

    /**
     * @description update user in store
     */
    updateUserObject({ variable_path, data }) {
      this.UPDATE_USER_STATE({
        variable_path,
        data,
      });
    },
  },
};
