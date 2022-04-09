<template>
  <v-container class="mt-10 pl-3 pl-lg-15" fluid>
    <v-row>
      <v-col cols="12" lg="9">
        <Player :options="options()" />
      </v-col>
      <v-col cols="12" lg="3" class="f-">
        <BaseSuggestionList :category="film.category" :exclude_id="film._id" />
      </v-col>
      <v-col cols="12">
        <BaseCommentForm :content="film" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import filmMixins from "@/mixins/film";
import BaseSuggestionList from "@/pages/film/widget/BaseSuggestionList";
import BaseCommentForm from "@/pages/film/widget/BaseCommentForm";
export default {
  name: "FilmPlayer",
  mixins: [filmMixins],
  components: {
    BaseSuggestionList,
    BaseCommentForm,
  },
  data() {
    return {
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
    };
  },
  methods: {
    /**
     * @description video options
     */
    options() {
      return Object.assign(this.default_options, {
        type: "video",
        title: this.film.title,
        sources: [
          {
            src: this.film.url,
            type: "mp4",
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

<style scoped></style>
