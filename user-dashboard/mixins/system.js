export default {
    data() { },
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
}