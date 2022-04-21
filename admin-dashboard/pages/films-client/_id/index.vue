<template>
  <v-container v-if="has_film">
    <div class="text-body-1 text-sm-h6 text-uppercase primary--text mb-5">
      <span class="app-title">
        <span v-html="$t('Chỉnh Sửa Phim')"></span>
      </span>
    </div>
    <v-form v-model="form_valid">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            :rules="titleRules"
            :label="$t('Title')"
            :value="film.title"
            required
            @input="updateInput({ variable_path: 'title', data: $event })"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            :rules="descriptionRules"
            :label="$t('Description')"
            :value="film.description"
            required
            @input="updateInput({ variable_path: 'description', data: $event })"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            :rules="urlRules"
            :label="$t('URL Film')"
            :value="film.url"
            required
            type="email"
            @input="updateInput({ variable_path: 'url', data: $event })"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-autocomplete
            :value="film.categories"
            :items="film_categories"
            label="Category"
            item-text="text"
            item-value="value"
            multiple
            chips
            clearable
            deletable-chips
            small-chips
            @input="updateInput({ variable_path: 'category', data: $event })"
          ></v-autocomplete>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-file-input
            v-model="file_of_film"
            small-chips
            truncate-length="15"
            :label="$t('Choose film')"
            @change="uploadFilm"
            accept="video/*"
          ></v-file-input>
        </v-col>

        <v-col cols="12" md="6" class="d-flex justify-end">
          <v-menu transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="Manufacture at"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                :value="
                  formatDate(getFilmMetaData('manufactured_at'), 'YYYY/MM/DD')
                "
              ></v-text-field>
            </template>
            <v-date-picker
              :value="
                formatDate(getFilmMetaData('manufactured_at'), 'YYYY/MM/DD')
              "
              v-model="film_manufactured_at"
              color="green lighten-1"
              @input="
                updateInput({
                  variable_path: 'meta.manufactured_at',
                  data: $event,
                })
              "
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-if="film_url" cols="12">
          <Player :options="options" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="7">
          <v-row>
            <v-col cols="12">
              <v-menu transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="Release at"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :value="
                      formatDate(getFilmMetaData('released_at'), 'YYYY/MM/DD')
                    "
                  ></v-text-field>
                </template>
                <v-date-picker
                  :value="
                    formatDate(getFilmMetaData('released_at'), 'YYYY/MM/DD')
                  "
                  v-model="film_released_at"
                  color="green lighten-1"
                  @input="
                    updateInput({
                      variable_path: 'meta.released_at',
                      data: $event,
                    })
                  "
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-file-input
                v-model="file_of_film_thumbnail"
                small-chips
                truncate-length="15"
                :label="$t('Choose thumbnail')"
                @change="uploadThumbnail"
                accept="image/*"
              ></v-file-input>
            </v-col>
            <v-col cols="12">
              <v-text-field
                :value="getFilmMetaData('director')"
                :label="$t('Director')"
                :rules="directorRules"
                required
                @input="
                  updateInput({
                    variable_path: 'meta.director',
                    data: $event,
                  })
                "
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                :value="getFilmData('series')"
                :items="series_array"
                label="Series"
                item-text="title"
                item-value="_id"
                multiple
                chips
                clearable
                deletable-chips
                small-chips
                @input="updateInput({ variable_path: 'series', data: $event })"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-col>

        <v-col
          v-if="film_thumbnail"
          cols="12"
          md="5"
          class="d-flex justify-end"
        >
          <v-img :src="film_thumbnail"></v-img>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-autocomplete
            :value="getFilmMetaData('countries')"
            :items="countries"
            item-text="name"
            item-value="code"
            chips
            multiple
            clearable
            deletable-chips
            small-chips
            @input="
              updateInput({
                variable_path: 'meta.countries',
                data: $event,
              })
            "
            :label="$t('Countries')"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :value="getFilmMetaData('quality')"
            :label="$t('Quality')"
            :rules="qualityRules"
            required
            @input="
              updateInput({
                variable_path: 'meta.quality',
                data: $event,
              })
            "
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-autocomplete
            :value="getFilmMetaData('languages')"
            :items="languages"
            item-text="name"
            item-value="code"
            chips
            multiple
            clearable
            deletable-chips
            small-chips
            @input="
              updateInput({
                variable_path: 'meta.languages',
                data: $event,
              })
            "
            :label="$t('Languages')"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :value="getFilmMetaData('actors')"
            :label="$t('Actors')"
            :rules="actorsRules"
            required
            @input="
              updateInput({
                variable_path: 'meta.actors',
                data: $event,
              })
            "
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-autocomplete
            :value="getFilmMetaData('status')"
            :items="statuses"
            chips
            multiple
            clearable
            deletable-chips
            small-chips
            @input="
              updateInput({
                variable_path: 'meta.status',
                data: $event,
              })
            "
            :label="$t('Status')"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :value="getFilmMetaData('film_studio')"
            :label="$t('Quality')"
            :rules="studioRules"
            required
            @input="
              updateInput({
                variable_path: 'meta.film_studio',
                data: $event,
              })
            "
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-autocomplete
            :value="getFilmMetaData('tags')"
            :items="tags"
            chips
            multiple
            clearable
            deletable-chips
            small-chips
            @input="
              updateInput({
                variable_path: 'meta.tags',
                data: $event,
              })
            "
            :label="$t('Tags')"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :value="getFilmMetaData('age_limit')"
            :label="$t('Age limit')"
            :rules="ageLimitRules"
            required
            @input="
              updateInput({
                variable_path: 'meta.age_limit',
                data: $event,
              })
            "
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mt-5">
        <v-col cols="12" class="d-flex justify-end">
          <v-btn
            depressed
            color="primary"
            @click="updateFilm()"
            :disabled="!form_valid"
          >
            <span v-html="$t('Lưu')"></span>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import filmMixins from "@/mixins/film";
import authMixins from "@/mixins/auth";
import adminMixins from "@/mixins/admin";
import seriesMixins from "@/mixins/series";
import countriesMixins from "@/mixins/countries";
import languagesMixins from "@/mixins/languages";
import tagsMixins from "@/mixins/tags";
import systemMixins from "@/mixins/system";

import Player from "@/components/Player";

export default {
  name: "NewFilm",
  mixins: [
    filmMixins,
    authMixins,
    adminMixins,
    countriesMixins,
    languagesMixins,
    tagsMixins,
    seriesMixins,
    systemMixins,
  ],
  components: { Player },
  data() {
    return {
      qualities: [
        {
          text: "4K",
          value: "4k",
        },
        {
          text: "Full HD",
          value: "full hd",
        },
        {
          text: "HD",
          value: "hd",
        },
        {
          text: "Low",
          value: "low",
        },
      ],
      statuses: [
        {
          text: "Available",
          value: "available",
        },
        {
          text: "Blocked",
          value: "blocked",
        },
        {
          text: "Updating",
          value: "updating",
        },
      ],
      form_valid: false,
      film_id: "",
      default_options: {
        type: "video",
        title: "Example title",
        sources: [
          {
            src: "/path/to/movie.mp4",
            type: "video/mp4",
            size: 720,
          },
          {
            src: "/path/to/movie.webm",
            type: "video/webm",
            size: 1080,
          },
        ],
      },
      file_of_film: null,
      file_of_film_thumbnail: null,
      film_manufactured_at: new Date(Date.now()).toISOString().substr(0, 10),
      film_released_at: new Date(Date.now()).toISOString().substr(0, 10),
      film_categories: [
        {
          text: "Comedy",
          value: "comedy",
        },
        {
          text: "Horror",
          value: "horror",
        },
        {
          text: "Documentary",
          value: "documentary",
        },
        {
          text: "Family",
          value: "family",
        },
        {
          text: "Kid",
          value: "kid",
        },
        {
          text: "Vietnam",
          value: "vietnam",
        },
        {
          text: "USUK",
          value: "usuk",
        },
      ],
    };
  },
  computed: {
    has_film() {
      return !!this.film;
    },

    film_url() {
      const has_aws_location = _.get(this.film, "aws.meta.location", "");
      return has_aws_location;
    },

    film_thumbnail() {
      const has_aws_location = _.get(
        this.film,
        "aws_thumnail.meta.location",
        ""
      );
      return has_aws_location;
    },
    /**
     * @description video options
     */
    options() {
      const film_url = this.film_url;
      const film_title = _.get(this.film, "title", "");
      const film_type = _.get(this.film, "aws.mime_type", "");

      return Object.assign(this.default_options, {
        type: "video",
        title: film_title,
        ratio: "16:9",
        sources: [
          {
            src: film_url,
            type: film_type,
            size: 720,
          },
          {
            src: "bTqVqk7FSmY",
            provider: "youtube",
          },
        ],
      });
    },
  },
  methods: {
    async updateFilm() {
      await this.UPDATE_FILM({ film_id: this.film._id });
    },

    updateInput({ variable_path, data }) {
      this.SET_FILM_DATA({
        variable_path,
        data,
      });
    },
    async uploadFilm() {
      const max_size = 50 * 1024 * 1024; // 5MB
      const file = this.file_of_film;
      const file_size = _.get(file, "size", max_size + 1);

      if (file && file_size <= max_size) {
        this.$nextTick(async () => {
          await this.UPLOAD_FILM({
            file: this.file_of_film,
            film_id: this.film._id,
          });

          location.reload();
        });
      }
    },
    async uploadThumbnail() {
      const max_size = 50 * 1024 * 1024; // 5MB
      const file = this.file_of_film_thumbnail;
      const file_size = _.get(file, "size", max_size + 1);

      if (file && file_size <= max_size) {
        this.$nextTick(async () => {
          await this.UPDATE_FILM_THUMBNAIL({
            file: this.file_of_film_thumbnail,
            film_id: this.film._id,
          });
          this.$forceUpdate();
        });
      }
    },
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      const film_id = this.$route.params.id;
      await Promise.all([this.GET_FILM({ film_id }), this.GET_SERIES_ARRAY()]);
    } catch (e) {
      console.log(e);
    } finally {
      this.SET_LOADING({ data: false });
    }
  },
};
</script>

<style></style>
