import _ from "lodash";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      film_loading: "film/loading",
      pagination: "film/pagination",
      films: "film/films",
      film: "film/film",
      populate_films: "film/populate_films",
      newest_films: "film/newest_films",
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
      GET_FILMS_PAGINATED: "film/GET_FILMS_PAGINATED",
    }),

    ...mapMutations({
      SET_LOADING: "film/SET_LOADING",
    }),

    filterFilmByCategory({ category, exclude_id = "" }) {
      const filtered_films = _.filter(this.films, function (film) {
        const valid = film.category === category && film._id !== exclude_id;
        return valid;
      });

      return filtered_films;
    },
  },
};
