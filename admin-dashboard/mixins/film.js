import _ from "lodash";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      film_loading: "film/loading",
      pagination: "film/pagination",
      films: "film/films",
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
      GET_FILMS: "film/GET_FILMS",
      GET_FILM: "film/GET_FILM",
      GET_FILM_BY_SLUG: "film/GET_FILM_BY_SLUG",
      DELETE_FILM: "film/DELETE_FILM",
      PUBLISH_FILM: "film/PUBLISH_FILM",
      HARD_DELETE_FILM: "film/HARD_DELETE_FILM",
      UPDATE_FILM_THUMBNAIL: "film/UPDATE_FILM_THUMBNAIL",
      UPDATE_FILM: "film/UPDATE_FILM",
    }),

    ...mapMutations({
      SET_LOADING: "film/SET_LOADING",
    }),
  },
};
