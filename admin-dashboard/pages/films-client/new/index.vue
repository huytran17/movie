<template>
  <v-container>
    <v-form>
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
          <v-text-field
            :rules="descriptionRules"
            :label="$t('Description')"
            :value="new_film.description"
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
            :value="new_film.url"
            required
            type="email"
            @input="updateInput({ variable_path: 'url', data: $event })"
          ></v-text-field>
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
          <v-row>
            <v-col cols="12">
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
            <v-col cols="12">
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
            <v-col cols="12">
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
            <v-col cols="12">
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
            :value="new_film.meta.film_studio"
            @input="
              updateInput({
                variable_path: 'meta.film_studio',
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
        <v-col cols="12" class="d-flex justify-end">
          <v-btn depressed color="primary" @click="createFilm()">
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

export default {
  name: "NewFilm",
  mixins: [
    filmMixins,
    authMixins,
    adminMixins,
    countriesMixins,
    languagesMixins,
    tagsMixins,
  ],
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
      film_manufactured_at: new Date(Date.now()).toISOString().substr(0, 10),
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
      await this.CREATE_FILM({ film_data: this.new_film });
      this.$router.push(this.localePath("/films-client"));
    },

    updateInput({ variable_path, data }) {
      this.SET_NEW_FILM_DATA({
        variable_path,
        data,
      });
    },
  },
};
</script>

<style></style>
