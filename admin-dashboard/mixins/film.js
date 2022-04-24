import _ from "lodash";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      titleRules: [(v) => !!v || this.$t("Title is required.")],
      hourRules: [(v) => !!v || this.$t("Duration is required.")],
      minuteRules: [(v) => !!v || this.$t("Duration is required.")],
      ageLimitRules: [(v) => !!v || this.$t("Age limit is required.")],
      studioRules: [(v) => !!v || this.$t("Studio is required.")],
      ratingRules: [(v) => !!v || this.$t("Rating is required.")],
      qualityRules: [(v) => !!v || this.$t("Quality is required.")],
      actorsRules: [(v) => !!v || this.$t("Actor time is required.")],
      directorRules: [(v) => !!v || this.$t("Director is required.")],
      totalTimeRules: [(v) => !!v || this.$t("Total time is required.")],
      // countriesRules: [(v) => !!v || this.$t("Country is required.")],
      // languagesRules: [(v) => !!v || this.$t("Language is required.")],
      // tagsRules: [(v) => !!v || this.$t("Tag is required.")],
      // categoriesRules: [(v) => !!v || this.$t("Category is required.")],
      descriptionRules: [(v) => !!v || this.$t("Description is required.")],
      manufactureYearRules: [
        (v) => !!v || this.$t("Manufacture year is required."),
      ],
      urlRules: [
        // eslint-disable-next-line no-useless-escape
        (v) =>
          v
            ? /https?:[0-9]*\/\/[\w!?/\+\-_~=;\.,*&@#$%\(\)\'\[\]]+/.test(v) ||
              "URL must be valid"
            : true,
      ],
    };
  },
  computed: {
    ...mapGetters({
      film_loading: "film/loading",
      pagination: "film/pagination",
      films: "film/films",
      new_film: "film/new_film",
      film: "film/film",
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
      CREATE_FILM: "film/CREATE_FILM",
      UPLOAD_FILM: "film/UPLOAD_FILM",
      UPLOAD_FILM_TRAILER: "film/UPLOAD_FILM_TRAILER",
    }),

    ...mapMutations({
      SET_LOADING: "film/SET_LOADING",
      SET_NEW_FILM_DATA: "film/SET_NEW_FILM_DATA",
      SET_FILM_DATA: "film/SET_FILM_DATA",
    }),

    getFilmMetaData(path) {
      const data = _.get(this.film, `meta.${path}`, "");
      return data;
    },

    getFilmData(path) {
      const data = _.get(this.film, path, "");
      return data;
    },
  },
};
