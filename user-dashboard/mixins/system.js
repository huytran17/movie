import _ from "lodash";

export default {
  computed: {
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
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();

      return value.replace(/\w+/g, _.capitalize);
    },
  },
};
