import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
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
