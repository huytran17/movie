<template>
  <v-container class="mt-10 pl-3 pl-lg-15" fluid>
    <v-row>
      <v-col cols="12" lg="9">
        <Player :options="options()" />
      </v-col>
      <v-col cols="12" lg="3">
        <BaseSuggestionList :category="film.category" :exclude_id="film_id" />
      </v-col>
    </v-row>
    <v-row class="flex-column-reverse flex-lg-row">
      <v-col cols="12" lg="9">
        <div class="d-flex flex-column">
          <div>
            <BaseCommentForm :content="film" />
          </div>
          <div class="d-flex justify-end mt-4">
            <v-btn depressed color="primary" @click="createComment">
              <span v-html="$t('Bình luận')"></span>
            </v-btn>
          </div>
        </div>

        <BaseCommentList />
      </v-col>

      <v-col cols="12" lg="3"> <BaseFeedbacksList :film_id="film_id" /> </v-col
    ></v-row>
  </v-container>
</template>

<script>
import filmMixins from "@/mixins/film";
import commentMixins from "@/mixins/comment";
import userMixins from "@/mixins/user";
import authMixins from "@/mixins/auth";

import BaseFeedbacksList from "@/pages/feedback/BaseFeedbacksList";
import BaseSuggestionList from "@/pages/film/widget/BaseSuggestionList";
import BaseCommentForm from "@/pages/film/widget/BaseCommentForm";
import BaseCommentList from "@/pages/comment/widget/BaseCommentList";
import Player from "@/components/Player";

export default {
  name: "FilmPlayer",
  mixins: [filmMixins, commentMixins, userMixins, authMixins],
  components: {
    BaseSuggestionList,
    BaseCommentForm,
    BaseCommentList,
    BaseFeedbacksList,
    Player,
  },
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
    };
  },
  methods: {
    async createComment() {
      await this.CREATE_COMMENT({
        user: this.user._id,
        film: this.film._id,
      });
      await this.GET_COMMENTS();
    },
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
      this.film_id = this.$route.params.id;
      await this.GET_FILM({ film_id: this.film_id });
    } catch (e) {
      console.log(e);
    } finally {
      this.SET_LOADING({ data: false });
    }
  },
};
</script>

<style scoped>
@media only screen and (max-width: 1263px) {
  .comment-column {
    order: 2;
  }
  .feedback-column {
    order: 1;
  }
}
::v-deep .v-btn {
  border-radius: 0 !important;
}
</style>
