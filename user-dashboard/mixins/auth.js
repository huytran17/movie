import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid.",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length > 7) || "Password must be min 8 characters",
      ],
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  methods: {
    ...mapActions({
      LOGIN: "auth/LOGIN",
      REGISTER: "auth/REGISTER",
    }),

    ...mapMutations({
      SET_USER: "auth/SET_USER",
      SET_JWT_TOKEN: "auth/SET_JWT_TOKEN",
    }),
  },
};
