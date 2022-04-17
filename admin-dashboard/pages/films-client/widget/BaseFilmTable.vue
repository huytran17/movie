<template>
  <div>
    <BaseTableLoader v-if="film_loading" />
    <v-data-table
      v-else
      :headers="headers"
      :items="get_films"
      :search="search"
      :items-per-page="15"
    >
      <template v-slot:item.film_tools="{ item }">
        <v-btn
          icon
          @click="$router.push(localePath(`/films-client/${item._id}`))"
        >
          <v-icon color="primary">mdi-grease-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="openDeleteFilmConfirmDialog({ film: item })">
          <v-icon color="red">mdi-delete-forever</v-icon>
        </v-btn>
      </template>

      <template v-slot:item.title="{ item }">
        <a
          @click="$router.push(localePath(`/films-client/${item._id}`))"
          class="text-body-2 primary--text"
        >
          <span class="app-title">
            {{ item.title }}
          </span>
        </a>
      </template>
      <template v-slot:item.thumnail="{ item }">
        <v-img :src="getFilmThumbnail(item)" max-width="200px"></v-img>
      </template>
      <template v-slot:item.created_at="{ item }">
        {{ $moment(item.created_at).format("DD-MM-YYYY") }}
      </template>

      <template v-slot:item.updated_at="{ item }">
        {{ $moment(item.updated_at).format("DD-MM-YYYY") }}
      </template>

      <template v-slot:item.meta.released_at="{ item }">
        {{ $moment(item.meta.released_at).format("DD-MM-YYYY") }}
      </template>

      <template v-slot:item.meta.manufactured_at="{ item }">
        {{ $moment(item.meta.manufactured_at).format("DD-MM-YYYY") }}
      </template>

      <template v-slot:item.categories="{ item }">
        <ul>
          <li v-for="(category, index) in item.categories" :key="index">
            <div class="text-body-2">
              <span class="app-body">
                <span v-html="$t(category)"></span>
              </span>
            </div>
          </li>
        </ul>
      </template>

      <template v-slot:item.meta.actors="{ item }">
        <ul>
          <li v-for="(actor, index) in item.meta.actors" :key="index">
            <div class="text-body-2">
              <span class="app-body">
                <span v-html="$t(actor)"></span>
              </span>
            </div>
          </li>
        </ul>
      </template>
      <template v-slot:item.meta.countries="{ item }">
        <ul>
          <li v-for="(country, index) in item.meta.countries" :key="index">
            <div class="text-body-2">
              <span class="app-body">
                <span
                  v-html="$t(getCountryText({ country_code: country }))"
                ></span>
              </span>
            </div>
          </li>
        </ul>
      </template>
      <template v-slot:item.meta.languages="{ item }">
        <ul>
          <li v-for="(language, index) in item.meta.languages" :key="index">
            <div class="text-body-2">
              <span class="app-body">
                <span
                  v-html="$t(getLanguageText({ language_code: language }))"
                ></span>
              </span>
            </div>
          </li>
        </ul>
      </template>

      <template v-slot:item.meta.tags="{ item }">
        <ul>
          <li v-for="(tag, index) in item.meta.tags" :key="index">
            <div class="text-body-2">
              <span class="app-body">
                <span v-html="$t(tag)"></span>
              </span>
            </div>
          </li>
        </ul>
      </template>
    </v-data-table>

    <ConfirmDialog
      :show_confirm_dialog="show_confirm_dialog"
      :content="confirm_content"
      :action="deleteFilm"
      @close-dialog="show_confirm_dialog = false"
    />
  </div>
</template>

<script>
import filmMixins from "@/mixins/film";
import ConfirmDialog from "@/components/ConfirmDialog";
import BaseTableLoader from "@/components/loaders/BaseTableLoader";
import countriesMixins from "@/mixins/countries";
import languagesMixins from "@/mixins/languages";

export default {
  name: "BaseFilmTable",
  mixins: [filmMixins, countriesMixins, languagesMixins],
  components: {
    BaseTableLoader,
    ConfirmDialog,
  },
  props: {
    headers: {
      type: Array,
      default() {
        return [
          {
            text: "Title",
            align: "start",
            filterable: false,
            value: "title",
            width: 200,
          },
          {
            text: "Description",
            align: "start",
            filterable: false,
            value: "description",
            width: 250,
          },
          {
            text: "Category",
            align: "start",
            filterable: false,
            value: "categories",
            width: 200,
          },
          {
            text: "Manufacture year",
            align: "start",
            filterable: false,
            value: "meta.manufactured_at",
            width: 200,
          },
          {
            text: "Release at",
            align: "start",
            filterable: false,
            value: "meta.released_at",
            width: 250,
          },
          {
            text: "Series",
            align: "start",
            filterable: false,
            value: "series.title",
            width: 200,
          },
          {
            text: "Thumnail",
            align: "start",
            filterable: false,
            value: "thumnail",
            width: 250,
          },
          {
            text: "Views",
            align: "start",
            filterable: false,
            value: "view_count",
            width: 150,
            sortable: false,
          },
          {
            text: "Director",
            align: "start",
            filterable: false,
            value: "meta.director",
            width: 150,
            sortable: false,
          },
          {
            text: "Actors",
            align: "start",
            filterable: false,
            value: "meta.actors",
            width: 150,
            sortable: false,
          },
          {
            text: "Total time",
            align: "start",
            filterable: false,
            value: "meta.total_time",
            width: 150,
            sortable: false,
          },
          {
            text: "Country",
            align: "start",
            filterable: false,
            value: "meta.countries",
            width: 150,
            sortable: false,
          },
          {
            text: "Quality",
            align: "start",
            filterable: false,
            value: "meta.quality",
            width: 150,
            sortable: false,
          },
          {
            text: "Rating",
            align: "start",
            filterable: false,
            value: "meta.rating",
            width: 150,
            sortable: false,
          },
          {
            text: "Language",
            align: "start",
            filterable: false,
            value: "meta.languages",
            width: 150,
            sortable: false,
          },
          {
            text: "Film studio",
            align: "start",
            filterable: false,
            value: "meta.film_studio",
            width: 150,
            sortable: false,
          },
          {
            text: "Status",
            align: "start",
            filterable: false,
            value: "meta.status",
            width: 150,
            sortable: false,
          },
          {
            text: "Tags",
            align: "start",
            filterable: false,
            value: "meta.tags",
            width: 150,
            sortable: false,
          },
          {
            text: "Age limit",
            align: "start",
            filterable: false,
            value: "meta.age_limit",
            width: 150,
            sortable: false,
          },
          {
            text: "Created at",
            align: "start",
            filterable: false,
            value: "created_at",
            width: 250,
          },
          {
            text: "Last updated at",
            align: "start",
            filterable: false,
            value: "updated_at",
            width: 250,
          },
          {
            text: "Tools",
            align: "start",
            filterable: false,
            value: "film_tools",
            width: 150,
            sortable: false,
          },
        ];
      },
    },
  },
  data() {
    return {
      search: null,
      show_confirm_dialog: false,
      confirm_content: "",
      choosen_film: null,
    };
  },
  computed: {
    get_films() {
      return this.films;
    },
  },
  methods: {
    getFilmThumbnail(item) {
      const thumbnail = _.get(item, "aws_thumnail.meta.location", "");
      return thumbnail;
    },
    async openDeleteFilmConfirmDialog({ film }) {
      this.confirm_content = `Bạn có muốn xóa phim <b>${film.title}</b> không?`;
      this.show_confirm_dialog = true;
      this.choosen_film = film;
    },

    async deleteFilm() {
      await Promise.all([
        this.DELETE_FILM({ film_id: this.choosen_film._id }),
        this.GET_FILMS(),
      ]);

      this.show_confirm_dialog = false;
    },
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      await this.GET_FILMS();
    } catch (e) {
      console.log(e);
    } finally {
      this.SET_LOADING({ data: false });
    }
  },
};
</script>

<style scoped>
::v-deep .v-data-table__wrapper::-webkit-scrollbar {
  height: 1px !important;
}

/* Track */
::v-deep .v-data-table__wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::v-deep .v-data-table__wrapper::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::v-deep .v-data-table__wrapper::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
