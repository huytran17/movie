<template>
  <v-container class="mt-10 pl-3 pl-lg-15" fluid>
    <v-row>
      <v-col cols="12" lg="9">
        <Player :options="options()" />
      </v-col>
      <v-col cols="12" lg="9">
        <v-tabs v-model="tab">
          <v-tabs-slider></v-tabs-slider>

          <v-tab v-for="(tab_item, index) in tab_items" :key="index">
            {{ tab_item.text }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item class="mt-4">
            <v-row>
              <v-col cols="12" md="6">
                <div class="text-body-2">
                  <v-icon small color="primary">mdi-adjust</v-icon>
                  <span v-html="$t('Series: ')" class="font-weight-bold">
                  </span>
                  <span
                    v-if="film_series"
                    v-html="$t(film_series.title)"
                    class="primary--text"
                  ></span>
                </div>

                <div class="text-body-2 mt-2">
                  <v-icon small color="primary">mdi-adjust</v-icon>
                  <span v-html="$t('Status: ')" class="font-weight-bold">
                  </span>
                  <span
                    v-if="film_meta"
                    v-html="$t(film.meta.status)"
                    class="primary--text text-capitalize"
                  ></span>
                </div>

                <div class="text-body-2 mt-2">
                  <v-icon small color="primary">mdi-adjust</v-icon>
                  <span v-html="$t('Categories: ')" class="font-weight-bold">
                  </span>
                  <span
                    v-html="$t(joinArray(film.categories, ', '))"
                    class="primary--text text-capitalize"
                  ></span>
                </div>

                <div class="text-body-2 mt-2">
                  <v-icon small color="primary">mdi-adjust</v-icon>
                  <span v-html="$t('Director: ')" class="font-weight-bold">
                  </span>
                  <span
                    v-if="film_meta"
                    v-html="$t(film.meta.director)"
                    class="primary--text text-capitalize"
                  ></span>
                </div>

                <div class="text-body-2 mt-2">
                  <v-icon small color="primary">mdi-adjust</v-icon>
                  <span v-html="$t('Country: ')" class="font-weight-bold">
                  </span>
                  <span
                    v-if="film_meta"
                    v-html="$t(joinArray(film.meta.countries, ', '))"
                    class="primary--text text-capitalize"
                  ></span>
                </div>
              </v-col>
              <v-col cols="12" md="6"></v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
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

      <v-col cols="12" lg="3">
        <BaseFeedbacksList :film_id="film_id" />
      </v-col>
    </v-row>
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
      tab: "information",
      tab_items: [
        {
          text: "Information",
          value: "information",
        },
        {
          text: "Trailer",
          value: "trailer",
        },
      ],
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
  computed: {
    film_series() {
      return _.get(this.film, "series");
    },

    film_meta() {
      return _.get(this.film, "meta");
    },
  },
  methods: {
    joinArray(array, separator) {
      return _.join(array, separator);
    },
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
