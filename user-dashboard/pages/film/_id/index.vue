<template>
  <v-container v-if="has_film" class="mt-2 pl-3 pl-lg-15" fluid>
    <v-row>
      <v-col cols="12" lg="9">
        <v-row>
          <v-col cols="12">
            <Player :options="options" :key="player_key" />
          </v-col>

          <v-col cols="12" class="py-0">
            <div class="text-subtitle-1">
              <span class="app-title">
                <span v-html="film.title"></span>
              </span>
            </div>
          </v-col>

          <v-col cols="12">
            <v-tabs v-model="tab" class="mb-4">
              <v-tabs-slider></v-tabs-slider>

              <v-tab v-for="(tab_item, index) in tab_items" :key="index">
                {{ tab_item.text }}
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item>
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

                    <div class="text-body-2 mt-4">
                      <v-icon small color="primary">mdi-adjust</v-icon>
                      <span v-html="$t('Status: ')" class="font-weight-bold">
                      </span>
                      <span
                        v-if="film_meta"
                        v-html="$t(film.meta.status)"
                        class="primary--text text-capitalize"
                      ></span>
                    </div>

                    <div class="text-body-2 mt-4">
                      <v-icon small color="primary">mdi-adjust</v-icon>
                      <span
                        v-html="$t('Categories: ')"
                        class="font-weight-bold"
                      >
                      </span>
                      <span
                        v-html="$t(joinArray(film.categories || [], ', '))"
                        class="primary--text text-capitalize"
                      ></span>
                    </div>

                    <div class="text-body-2 mt-4">
                      <v-icon small color="primary">mdi-adjust</v-icon>
                      <span v-html="$t('Actors: ')" class="font-weight-bold">
                      </span>
                      <span
                        v-if="film_meta"
                        v-html="$t(joinArray(film.meta.actors || [], ', '))"
                        class="primary--text text-capitalize"
                      ></span>
                    </div>

                    <div class="text-body-2 mt-4">
                      <v-icon small color="primary">mdi-adjust</v-icon>
                      <span v-html="$t('Director: ')" class="font-weight-bold">
                      </span>
                      <span
                        v-if="film_meta"
                        v-html="$t(film.meta.director)"
                        class="primary--text text-capitalize"
                      ></span>
                    </div>

                    <div class="text-body-2 mt-4">
                      <v-icon small color="primary">mdi-adjust</v-icon>
                      <span v-html="$t('Country: ')" class="font-weight-bold">
                      </span>
                      <span
                        v-html="$t(joinArray(countries_mapped, ', '))"
                        class="primary--text text-capitalize"
                      ></span>
                    </div>
                  </v-col>
                  <v-col cols="12" md="6" class="pt-0 pt-md-4">
                    <div class="text-body-2 mt-0 mt-md-4">
                      <v-icon small color="primary">mdi-adjust</v-icon>
                      <span v-html="$t('Quality: ')" class="font-weight-bold">
                      </span>
                      <span
                        v-if="film_meta"
                        v-html="$t(film.meta.quality)"
                        class="primary--text text-capitalize"
                      ></span>
                    </div>
                    <div class="text-body-2 mt-4">
                      <v-icon small color="primary">mdi-adjust</v-icon>
                      <span v-html="$t('Languages: ')" class="font-weight-bold">
                      </span>
                      <span
                        v-html="$t(joinArray(languages_mapped, ', '))"
                        class="primary--text text-capitalize"
                      ></span>
                    </div>
                    <div class="text-body-2 mt-4">
                      <v-icon small color="primary">mdi-adjust</v-icon>
                      <span v-html="$t('Studio: ')" class="font-weight-bold">
                      </span>
                      <span
                        v-if="film_meta"
                        v-html="$t(film.meta.studio)"
                        class="primary--text text-capitalize"
                      ></span>
                    </div>
                    <div class="text-body-2 mt-4">
                      <v-icon small color="primary">mdi-adjust</v-icon>
                      <span v-html="$t('Duration: ')" class="font-weight-bold">
                      </span>
                      <span
                        v-if="film_meta"
                        v-html="$t(film_duration)"
                        class="primary--text text-capitalize"
                      ></span>
                    </div>
                    <div class="text-body-2 mt-4" v-if="age_limit">
                      <v-icon small color="primary">mdi-adjust</v-icon>
                      <span v-html="$t('Age limit: ')" class="font-weight-bold">
                      </span>
                      <span class="primary--text text-capitalize">
                        <span v-if="film_meta" v-html="$t(age_limit)"></span>
                        <span>+</span>
                      </span>
                    </div>
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item>
                <v-row v-if="trailer_url">
                  <v-col cols="12" class="trailer-wrapper mx-auto">
                    <video controls class="trailer-video">
                      <source :src="trailer_url" type="video/mp4" />
                    </video>
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" lg="3" v-if="film_categories.length">
        <BaseSuggestionList
          :categories="film_categories"
          :exclude_ids="[film_id]"
        />
      </v-col>
    </v-row>
    <v-row class="flex-column-reverse flex-lg-row">
      <v-col cols="12" lg="9">
        <div class="d-flex flex-column">
          <div>
            <BaseCommentForm :content="new_comment" />
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
import commentAssetMixins from "@/mixins/comment-asset";
import userMixins from "@/mixins/user";
import authMixins from "@/mixins/auth";
import countriesMixins from "@/mixins/countries";
import languagesMixins from "@/mixins/languages";

import BaseFeedbacksList from "@/pages/feedback/BaseFeedbacksList";
import BaseSuggestionList from "@/pages/film/widget/BaseSuggestionList";
import BaseCommentForm from "@/pages/film/widget/BaseCommentForm";
import BaseCommentList from "@/pages/comment/widget/BaseCommentList";
import Player from "@/components/Player";

export default {
  name: "FilmPlayer",
  mixins: [
    filmMixins,
    commentMixins,
    userMixins,
    authMixins,
    countriesMixins,
    languagesMixins,
    commentAssetMixins,
  ],
  components: {
    BaseSuggestionList,
    BaseCommentForm,
    BaseCommentList,
    BaseFeedbacksList,
    Player,
  },
  data() {
    return {
      player_key: 0,
      countries_mapped: [],
      languages_mapped: [],
      film_id: "",
      film_categories: [],
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
        ],
      },
    };
  },
  computed: {
    age_limit() {
      return _.get(this.film, "meta.age_limit");
    },
    trailer_url() {
      const has_aws_location = _.get(
        this.film,
        "aws_trailer.meta.location",
        ""
      );
      return has_aws_location;
    },
    has_film() {
      return !!this.film;
    },
    film_duration() {
      const minute = _.get(this.film, "meta.duration", "0");
      const duration = `${minute} phút`;
      return duration;
    },
    film_series() {
      return _.get(this.film, "series");
    },

    film_meta() {
      return _.get(this.film, "meta");
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
        ],
      });
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
      await this.GET_COMMENT_ASSETS_BY_FILM_ID({ film_id: this.film._id });
      this.updateNewCommentObject({ variable_path: "content", data: "" });
    },
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      this.film_id = this.$route.params.id;
      await this.GET_FILM({ film_id: this.film_id });

      const user_birthday = _.get(this.user, "birthday");
      const user_age = this.$moment().diff(user_birthday, "years");
      const film_age_limit = _.get(this.film, "meta.age_limit");
      const should_compare = !_.isNil(user_age) && !_.isNil(film_age_limit);

      if (should_compare) {
        const can_not_play = user_age < film_age_limit;
        if (can_not_play) {
          this.$toast.error(
            this.$t(`Bạn chưa đủ ${film_age_limit} để xem phim này.`)
          );
          this.$router.push(this.localePath("/"));
          return;
        }
      }

      this.film_categories = _.get(this.film, "categories", []);
      const countries = _.get(this.film, "meta.countries", []);
      this.countries_mapped = this.matchCountries(countries);

      const languages = _.get(this.film, "meta.languages", []);
      this.languages_mapped = this.matchCountries(languages);

      const view_count = _.get(this.film, "meta.view_count", 0);

      this.updateFilmObject({
        variable_path: "meta.view_count",
        data: view_count + 1,
      });
      await this.UPDATE_FILM({ film_id: this.film._id });

      ++this.player_key;
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
.trailer-video {
  min-width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.trailer-wrapper {
  max-width: 500px !important;
  width: 500px !important;
  height: calc(500px * 9 / 16);
  position: relative;
}
</style>
