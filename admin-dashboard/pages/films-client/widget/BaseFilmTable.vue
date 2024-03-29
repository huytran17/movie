<template>
  <div>
    <BaseTableLoader v-if="film_loading" />
    <v-card v-else>
      <v-data-table
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

        <template v-slot:item.description="{ item }">
          <span class="app-title description">
            <span v-html="item.description"></span>
          </span>
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
        <template v-slot:item.meta.duration="{ item }">
          <div class="text-body-2">
            <span class="app-body">
              <span
                >{{ item.meta.duration ? item.meta.duration : "_" }} phút</span
              >
            </span>
          </div>
        </template>
        <template v-slot:item.view_count="{ item }">
          <div class="text-body-2">
            <span class="app-body">
              <span>{{
                item.meta.view_count ? item.meta.view_count : "0"
              }}</span>
            </span>
          </div>
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
          <div class="table-scroll-y">
            <ul>
              <li v-for="(category, index) in item.categories" :key="index">
                <div class="text-body-2">
                  <span class="app-body">
                    <span v-html="$t(category)"></span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </template>
        <template v-slot:item.series="{ item }">
          <div v-if="item.series" class="text-body-2">
            <span class="app-body">
              <span v-html="$t(item.series.title)"></span>
            </span>
          </div>
        </template>

        <template v-slot:item.actors="{ item }">
          <div class="table-scroll-y">
            <ul>
              <li v-for="(actor, index) in item.meta.actors" :key="index">
                <div class="text-body-2">
                  <span class="app-body">
                    <span v-html="$t(actor)"></span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </template>
        <template v-slot:item.meta.countries="{ item }">
          <div class="table-scroll-y">
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
          </div>
        </template>
        <template v-slot:item.meta.languages="{ item }">
          <div class="table-scroll-y">
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
          </div>
        </template>

        <template v-slot:item.meta.tags="{ item }">
          <div class="table-scroll-y">
            <ul>
              <li v-for="(tag, index) in item.meta.tags" :key="index">
                <div class="text-body-2">
                  <span class="app-body">
                    <span v-html="$t(tag)"></span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </template>
      </v-data-table>
    </v-card>

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
            text: this.$t("Title"),
            align: "start",
            filterable: false,
            value: "title",
            width: 200,
          },
          {
            text: this.$t("Description"),
            align: "start",
            filterable: false,
            value: "description",
            width: 250,
          },
          {
            text: this.$t("Category"),
            align: "start",
            filterable: false,
            value: "categories",
            width: 200,
          },
          {
            text: this.$t("Manufacture at"),
            align: "start",
            filterable: false,
            value: "meta.manufactured_at",
            width: 200,
          },
          {
            text: this.$t("Release at"),
            align: "start",
            filterable: false,
            value: "meta.released_at",
            width: 250,
          },
          {
            text: this.$t("Series"),
            align: "start",
            filterable: false,
            value: "series",
            width: 200,
          },
          {
            text: this.$t("Thumnail"),
            align: "start",
            filterable: false,
            value: "thumnail",
            width: 250,
          },
          {
            text: this.$t("Views"),
            align: "start",
            filterable: false,
            value: "view_count",
            width: 150,
            sortable: false,
          },
          {
            text: this.$t("Director"),
            align: "start",
            filterable: false,
            value: "meta.director",
            width: 150,
            sortable: false,
          },
          {
            text: this.$t("Actors"),
            align: "start",
            filterable: false,
            value: "actors",
            width: 150,
            sortable: false,
          },
          {
            text: this.$t("Total time"),
            align: "start",
            filterable: false,
            value: "meta.duration",
            width: 150,
            sortable: false,
          },
          {
            text: this.$t("Country"),
            align: "start",
            filterable: false,
            value: "meta.countries",
            width: 150,
            sortable: false,
          },
          {
            text: this.$t("Quality"),
            align: "start",
            filterable: false,
            value: "meta.quality",
            width: 150,
            sortable: false,
          },
          {
            text: this.$t("Rating"),
            align: "start",
            filterable: false,
            value: "meta.rating",
            width: 150,
            sortable: false,
          },
          {
            text: this.$t("Language"),
            align: "start",
            filterable: false,
            value: "meta.languages",
            width: 150,
            sortable: false,
          },
          {
            text: this.$t("Film studio"),
            align: "start",
            filterable: false,
            value: "meta.studio",
            width: 150,
            sortable: false,
          },
          {
            text: this.$t("Status"),
            align: "start",
            filterable: false,
            value: "meta.status",
            width: 150,
            sortable: false,
          },
          {
            text: this.$t("Tags"),
            align: "start",
            filterable: false,
            value: "meta.tags",
            width: 150,
            sortable: false,
          },
          {
            text: this.$t("Age limit"),
            align: "start",
            filterable: false,
            value: "meta.age_limit",
            width: 150,
            sortable: false,
          },
          {
            text: this.$t("Created at"),
            align: "start",
            filterable: false,
            value: "created_at",
            width: 250,
          },
          {
            text: this.$t("Last updated at"),
            align: "start",
            filterable: false,
            value: "updated_at",
            width: 250,
          },
          {
            text: this.$t("Tools"),
            align: "center",
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
      const thumbnail = _.get(item, "aws_thumbnail.meta.location", "");
      console.log(thumbnail);
      return thumbnail;
    },
    openDeleteFilmConfirmDialog({ film }) {
      this.confirm_content = `Bạn có muốn xóa phim <b>${film.title}</b> không?`;
      this.show_confirm_dialog = true;
      this.choosen_film = film;
    },

    async deleteFilm() {
      const { is_error, message } = await this.DELETE_FILM({
        film_id: this.choosen_film._id,
      });

      if (!!is_error) {
        this.$toast.error(this.$t(message));
        return;
      }
      this.$toast.success(this.$t("Deleted film successfully!"));
      this.show_confirm_dialog = false;
      await this.GET_FILMS();
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
.description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
