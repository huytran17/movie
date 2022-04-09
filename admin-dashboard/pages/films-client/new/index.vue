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
            :value="new_film.category"
            :items="film_categories"
            label="Category"
            item-text="text"
            item-value="value"
            @input="updateInput({ variable_path: 'category', data: $event })"
          ></v-autocomplete>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-date-picker
            :value="new_film.meta.manufactured_at"
            v-model="film_manufactured_at"
            color="green lighten-1"
            @input="
              updateInput({
                variable_path: 'meta.manufactured_at',
                data: $event,
              })
            "
          ></v-date-picker>
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

export default {
  name: "NewFilm",
  mixins: [filmMixins, authMixins, adminMixins],
  data() {
    return {
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
