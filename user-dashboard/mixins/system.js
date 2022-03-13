import { mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      show_drawer: "show_drawer",
    }),
    /**
     *
     * @returns true if xs;
     */
    is_mobile() {
      return this.$vuetify.breakpoint.name === "xs";
    },
    /**
     *
     * @returns true if sm;
     */
    is_small_screen() {
      return this.$vuetify.breakpoint.name === "sm";
    },
    /**
     *
     * @returns return true if md;
     */
    is_medium_screen() {
      return this.$vuetify.breakpoint.name === "md";
    },
  },
  methods: {
    ...mapMutations({
      SET_SHOW_DRAWER: "SET_SHOW_DRAWER",
      TOGGLE_SHOW_DRAWER: "TOGGLE_SHOW_DRAWER",
    }),
    /**
     *
     * @param {*} date
     * @param {*} format
     * @returns format the date // default: "DD MMMM YYYY, hh:mm"
     */
    formatDate(date, format) {
      if (format) {
        return this.$moment(date).format(format);
      } else {
        return this.$moment(date).fromNow();
      }
    },
  },
};
