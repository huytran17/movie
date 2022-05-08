<template>
  <v-row v-if="has_suggestions_list" class="pt-3 mb-3 mb-lg-0">
    <v-col cols="12" class="py-0">
      <v-row class="suggestion-list">
        <v-col
          cols="3"
          lg="12"
          v-for="(film, index) in suggestions_list"
          :key="index"
          class="pb-0"
        >
          <v-row>
            <v-col cols="12" lg="5" class="d-flex d-lg-block">
              <v-img
                :src="filmThumbnail(film)"
                cover
                @click="goToFilm(film)"
                class="clickable"
              ></v-img>
            </v-col>
            <v-col cols="7" class="d-none d-lg-block pl-0">
              <div class="text-body-2">
                <span class="app-title">
                  <span
                    class="suggestion-title clickable"
                    v-html="$t(film.title)"
                    @click="goToFilm(film)"
                  ></span>
                </span>
              </div>

              <div class="text-body-2">
                <span class="app-body description">
                  <span v-html="$t(film.description)"></span>
                </span>
              </div>

              <div class="text-body-2 mt-1">
                <span class="app-body">
                  <span v-html="$t(film.meta.view_count.toString())"></span>
                  <v-icon small>mdi-eye</v-icon>
                </span>
              </div>

              <div
                v-if="film.meta && film.meta.rating"
                class="text-body-2 mt-1"
              >
                <span class="app-body">
                  <span v-html="$t(film.meta.rating)"></span>
                  <v-icon small>mdi-star</v-icon>
                </span>
              </div>

              <div class="text-body-2 mt-1" v-if="ageLimit(film)">
                <span class="app-body age-limit">
                  <span v-html="$t(ageLimit(film))"></span>
                  <span>+</span>
                </span>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <BaseNotificationDialog
      :show_notification_dialog="show_notification_dialog"
      @close-notification-dialog="show_notification_dialog = false"
      :content="notification_content"
    />
  </v-row>
</template>

<script>
import filmMixins from "@/mixins/film";
import authMixins from "@/mixins/auth";
import BaseNotificationDialog from "@/components/dialogs/BaseNotificationDialog";

export default {
  name: "BaseSuggestionList",
  mixins: [filmMixins, authMixins],
  components: {
    BaseNotificationDialog,
  },
  props: {
    categories: {
      type: Array,
      default() {
        return [];
      },
    },
    exclude_ids: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      notification_content: "",
      show_notification_dialog: false,
      suggestions_list: [],
    };
  },
  computed: {
    has_suggestions_list() {
      return this.suggestions_list.length > 0;
    },
  },
  methods: {
    filmThumbnail(film) {
      const has_aws_location = _.get(film, "aws_thumbnail.meta.location", "");
      return has_aws_location;
    },
    ageLimit(film) {
      return _.get(film, "meta.age_limit");
    },
    goToFilm(film) {
      const user_birthday = _.get(this.user, "birthday");
      const user_age = this.$moment().diff(user_birthday, "years");
      const film_age_limit = _.get(film, "meta.age_limit");
      const should_compare = !_.isNil(user_age) && !_.isNil(film_age_limit);

      if (should_compare) {
        const can_not_play = user_age < film_age_limit;
        if (can_not_play) {
          this.notification_content = `Bạn chưa đủ ${film_age_limit} tuổi để xem phim này.`;
          this.show_notification_dialog = true;
          return;
        }
      }

      this.$router.push(this.localePath(`/film/${film._id}`));
    },
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      const { data, pagination } = await this.GET_FILMS({
        categories: this.categories,
        exclude_ids: this.exclude_ids,
        new_state: true,
        keep_in_store: false,
      });
      this.suggestions_list = data;
    } catch (e) {
      console.log(e);
    } finally {
      this.SET_LOADING({ data: false });
    }
  },
};
</script>

<style scoped>
.suggestion-list {
  max-height: 631.16px;
  min-height: 631.16px;
  overflow: auto;
}
/* width */
.suggestion-list::-webkit-scrollbar {
  width: 1px;
}

/* Track */
.suggestion-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.suggestion-list::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.suggestion-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.suggestion-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
::v-deep .v-btn {
  border-radius: 0 !important;
}
.age-limit {
  border: 1px solid rgb(25, 162, 248);
  padding: 2px 3px;
  border-radius: 4px;
}
.description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
