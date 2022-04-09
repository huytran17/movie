import _ from "lodash";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      admin_loading: "admin/loading",
      pagination: "admin/pagination",
      admins: "admin/admins",
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
    }),

    ...mapMutations({
      SET_LOADING: "admin/SET_LOADING",
    }),
  },
};
