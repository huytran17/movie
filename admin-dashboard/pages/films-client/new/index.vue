<template>
  <v-container>
    <div class="text-body-1 text-sm-h6 text-uppercase primary--text mb-4">
      <span class="app-title">
        <span v-html="$t('Thêm Phim')"></span>
      </span>
    </div>
    <v-form v-model="form_valid">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            :rules="titleRules"
            :label="$t('Title')"
            :value="new_film.title"
            required
            @input="updateInput({ variable_path: 'title', data: $event })"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <Editor
            :rules="descriptionRules"
            :content="new_film"
            attr="description"
            @on-input="
              updateInput({ variable_path: 'description', data: $event })
            "
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            :value="new_film.meta.director"
            @input="
              updateInput({
                variable_path: 'meta.director',
                data: $event,
              })
            "
            :label="$t('Director')"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-autocomplete
            :value="new_film.categories"
            :items="film_categories"
            label="Categories"
            item-text="text"
            item-value="value"
            multiple
            deletable-chips
            small-chips
            chips
            @input="updateInput({ variable_path: 'categories', data: $event })"
          ></v-autocomplete>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <div class="text-body-2">
            <label class="date-picker-label"> Manufacture at </label>
          </div>
          <v-date-picker
            :value="new_film.meta.manufactured_at"
            v-model="film_manufactured_at"
            color="green lighten-1"
            full-width
            @input="
              updateInput({
                variable_path: 'meta.manufactured_at',
                data: $event,
              })
            "
          ></v-date-picker>
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-body-2">
            <label class="date-picker-label"> Release at </label>
          </div>
          <v-date-picker
            :value="new_film.meta.released_at"
            v-model="film_released_at"
            color="green lighten-1"
            full-width
            @input="
              updateInput({
                variable_path: 'meta.released_at',
                data: $event,
              })
            "
          ></v-date-picker>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-autocomplete
            :value="new_film.meta.countries"
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
          <v-autocomplete
            :value="new_film.meta.languages"
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
          <v-autocomplete
            :value="new_film.meta.tags"
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
            :value="new_film.meta.actors"
            @input="
              updateInput({
                variable_path: 'meta.actors',
                data: $event,
              })
            "
            :label="$t('Actors')"
            :hint="$t('Separate by the comma')"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mt-0">
        <v-col cols="12" md="6" class="pt-0">
          <v-autocomplete
            :value="new_film.meta.quality"
            :items="qualities"
            chips
            clearable
            deletable-chips
            small-chips
            @input="
              updateInput({
                variable_path: 'meta.quality',
                data: $event,
              })
            "
            :label="$t('Quality')"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="6" class="pt-0">
          <v-text-field
            :value="new_film.meta.studio"
            @input="
              updateInput({
                variable_path: 'meta.studio',
                data: $event,
              })
            "
            :label="$t('Studio')"
          >
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-autocomplete
            :value="new_film.meta.status"
            :items="statuses"
            chips
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
            :value="new_film.meta.age_limit"
            type="number"
            @input="
              updateInput({
                variable_path: 'meta.age_limit',
                data: $event,
              })
            "
            :label="$t('Age limit')"
          >
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-autocomplete
            :value="getFilmData('series')"
            :items="series_array"
            label="Series"
            item-text="title"
            item-value="_id"
            chips
            clearable
            deletable-chips
            small-chips
            @input="updateInput({ variable_path: 'series', data: $event })"
          ></v-autocomplete>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn
            depressed
            color="primary"
            @click="createFilm()"
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
import countriesMixins from "@/mixins/countries";
import languagesMixins from "@/mixins/languages";
import tagsMixins from "@/mixins/tags";
import seriesMixins from "@/mixins/series";
import Editor from "@/components/Editor";

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
  ],
  components: {
    Editor,
  },
  data() {
    return {
      form_valid: false,
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
  methods: {
    async createFilm() {
      const { is_error, message } = await this.CREATE_FILM({
        film_data: this.new_film,
      });
      if (is_error) {
        this.$toast.error(this.$t(message));
        return;
      }
      this.$toast.success(this.$t("Created film successfully!"));
      this.$router.push(this.localePath("/films-client"));
    },

    updateInput({ variable_path, data }) {
      this.SET_NEW_FILM_DATA({
        variable_path,
        data,
      });
    },
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      await Promise.all([this.GET_SERIES_ARRAY()]);
    } catch (e) {
      console.log(e);
    } finally {
      this.SET_LOADING({ data: false });
    }
  },
};
</script>

<style></style>
