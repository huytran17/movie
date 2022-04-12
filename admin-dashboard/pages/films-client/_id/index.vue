<template>
  <v-container>
    <v-form>
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
            :value="film.category"
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
          <v-row>
            <v-col cols="12">
              <v-file-input
                v-model="file_of_film"
                small-chips
                truncate-length="15"
                :label="$t('File')"
                @change="uploadFilm"
                accept="video/*"
              ></v-file-input>
            </v-col>
            <v-col cols="12">
              <Player :options="options" />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="6" class="d-flex justify-end">
          <v-date-picker
            :value="get_film_manufacture_at"
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
          <v-btn depressed color="primary" @click="updateFilm()">
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
import Player from "@/components/Player";

export default {
  name: "NewFilm",
  mixins: [filmMixins, authMixins, adminMixins],
  components: { Player },
  data() {
    return {
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
  computed: {
    get_film_manufacture_at() {
      return _.get(this.film, "meta.manufactured_at", "");
    },
    has_film() {
      const has_aws_location = _.get(this.film, "aws.meta.location", false);
      return has_aws_location;
    },
    /**
     * @description video options
     */
    options() {
      const film_url = _.get(this.film, "aws.meta.location", "");
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
      this.$router.push(this.localePath("/films-client"));
    },

    updateInput({ variable_path, data }) {
      this.SET_FILM_DATA({
        variable_path,
        data,
      });
    },
    uploadFilm() {
      const max_size = 50 * 1024 * 1024; // 5MB
      const file = this.file_of_film;
      const file_size = _.get(file, "size", max_size + 1);

      if (file && file_size <= max_size) {
        this.$nextTick(async () => {
          await this.UPLOAD_FILM({
            file: this.file_of_film,
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
      await this.GET_FILM({ film_id });
    } catch (e) {
      console.log(e);
    } finally {
      this.SET_LOADING({ data: false });
    }
  },
};
</script>

<style></style>
