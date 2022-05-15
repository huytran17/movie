<template>
  <v-row class="px-3">
    <v-col
      v-for="(film, index) in films_list"
      :key="index"
      cols="6"
      sm="3"
      md="2"
      class="px-0"
    >
      <v-card
        class="my-4 mx-1 pa-2 position-relative no-border-radius no-box-shadow w-100 h-100 d-flex flex-column"
        @click="goToFilm(film)"
      >
        <v-img
          :src="getFilmThumbnail(film)"
          :alt="film.title"
          cover
          class="no-border-radius"
        >
        </v-img>
        <v-card-title v-if="show_title">
          <div class="text-body-2">
            <span class="app-title">
              <span>{{ film.title }}</span>
            </span>
          </div>
        </v-card-title>
      </v-card>
    </v-col>

    <BaseNotificationDialog
      :show_notification_dialog="show_notification_dialog"
      @close-notification-dialog="show_notification_dialog = false"
      :content="notification_content"
    />
  </v-row>
</template>

<script>
import authMixins from "@/mixins/auth";
import BaseNotificationDialog from "@/components/dialogs/BaseNotificationDialog";
export default {
  name: "BaseFilmsList2",
  components: {
    BaseNotificationDialog,
  },
  mixins: [authMixins],
  props: {
    films_list: {
      type: Array,
      default() {
        return [];
      },
    },
    show_title: {
      type: Boolean,
      default() {
        return false;
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

<style></style>
