import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      smaller_than_1025: false,
      smaller_than_800: false,
    };
  },
  computed: {
    ...mapGetters({
      show_drawer: "show_drawer",
    }),
    /**
     *
     * @returns true if screen size < 1025px
     */
    is_smaller_than_1025() {
      return this.smaller_than_1025;
    },
    /**
     *
     * @returns true if screen size < 800px
     */
    is_smaller_than_800() {
      return this.smaller_than_800;
    },
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
    /**
     *
     * @returns true if screen size smaller than 1025
     */
    onResize() {
      this.smaller_than_1025 = window.innerWidth < 1025;
      this.smaller_than_800 = window.innerWidth < 800;
    },
  },
  mounted() {
    this.onResize();

    window.addEventListener("resize", this.onResize, { passive: true });
  },

  beforeDestroy() {
    if (typeof window === "undefined") return;

    window.removeEventListener("resize", this.onResize, { passive: true });
  },
};
