<template>
  <div class="px-3 my-4">
    <v-row class="px-3">
      <v-col
        v-for="(film, index) in films_list"
        :key="index"
        cols="6"
        sm="3"
        md="2"
        class="px-0"
      >
        <v-badge
          v-if="getAgeLimit(film)"
          color="green"
          :content="getAgeLimitString(film)"
          offset-y="26px"
          :offset-x="getAgeLimit(film) < 10 ? '25px' : '30px'"
          class="w-100"
        >
          <v-card
            class="my-4 mx-1 pa-2 no-border-radius no-box-shadow w-100"
            @click="goToFilm(film)"
          >
            <v-img
              :src="getFilmThumbnail(film)"
              :alt="film.title"
              cover
              class="no-border-radius"
            >
            </v-img>
          </v-card>
        </v-badge>
        <v-card
          v-else
          class="my-4 mx-1 pa-2 no-border-radius no-box-shadow w-100"
          @click="goToFilm(film)"
        >
          <v-img
            :src="getFilmThumbnail(film)"
            :alt="film.title"
            cover
            class="no-border-radius"
          >
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <BaseNotificationDialog
      :show_notification_dialog="show_notification_dialog"
      @close-notification-dialog="show_notification_dialog = false"
      :content="notification_content"
    />
  </div>
</template>

<script>
import BaseNotificationDialog from "@/components/dialogs/BaseNotificationDialog";
import authMixins from "@/mixins/auth";
import BaseFilmCard from "@/components/film/BaseFilmCard";
export default {
  name: "BaseFilmsList",
  mixins: [authMixins],
  components: {
    BaseFilmCard,
    BaseNotificationDialog,
  },
  props: {
    films_list: {
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
    };
  },
  methods: {
    getAgeLimit(film) {
      const age_limit = _.get(film, "meta.age_limit", 0);
      return age_limit;
    },
    getAgeLimitString(film) {
      const age_limit = this.getAgeLimit(film);
      return `${age_limit}+`;
    },

    openNotificationDialog({ age }) {
      this.notification_content = `Bạn chưa đủ ${age} tuổi để xem phim này.`;
      this.show_notification_dialog = true;
    },
    getFilmThumbnail(film) {
      return _.get(film, "aws_thumbnail.meta.location", "");
    },

    goToFilm(film) {
      const user_birthday = _.get(this.user, "birthday");
      const user_age = this.$moment().diff(user_birthday, "years");
      const film_age_limit = _.get(film, "meta.age_limit");
      const should_compare = !_.isNil(user_age) && !_.isNil(film_age_limit);

      if (should_compare) {
        const can_not_play = user_age < film_age_limit;
        if (can_not_play) {
          this.openNotificationDialog({ age: film_age_limit });
          return;
        }
      }

      this.$router.push(this.localePath(`/film/${film._id}`));
    },
  },
};
</script>

<style scoped>
._wrapper {
}
</style>
