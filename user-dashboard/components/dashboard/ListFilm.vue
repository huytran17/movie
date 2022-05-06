<template>
  <div class="mt-1">
    <div class="title">
      <div class="text-subtitle-1 text-h6">
        <span class="app-title">
          <span v-html="$t(title)"></span>
        </span>
      </div>
    </div>
    <div class="video-list mt-2">
      <v-sheet class="mx-auto w-100 no-box-shadow" elevation="0">
        <v-slide-group show-arrows="mobile" class="position-relative">
          <v-slide-item
            v-for="(film, index) in list_films"
            :key="index"
            class="clickable"
          >
            <BaseFilmCard
              :film_item="film"
              @open-notification-dialog="openNotificationDialog"
            />
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </div>

    <BaseNotificationDialog
      :show_notification_dialog="show_notification_dialog"
      @close-notification-dialog="show_notification_dialog = false"
      :content="notification_content"
    />
  </div>
</template>

<script>
import systemMixins from "@/mixins/system";
import filmMixins from "@/mixins/film";
import BaseFilmCard from "@/components/film/BaseFilmCard";
import BaseNotificationDialog from "@/components/dialogs/BaseNotificationDialog";

export default {
  name: "ListFilm",
  mixins: [systemMixins, filmMixins],
  components: { BaseFilmCard, BaseNotificationDialog },
  props: {
    title: {
      type: String,
      default() {
        return "";
      },
    },
    list_films: {
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
    openNotificationDialog({ age }) {
      this.notification_content = `Bạn chưa đủ ${age} tuổi để xem phim này.`;
      this.show_notification_dialog = true;
    },
    getAgeLimit(film) {
      const age_limit = _.get(film, "meta.age_limit", 0);
      return age_limit;
    },
    getAgeLimitString(film) {
      const age_limit = this.getAgeLimit(film);
      return `${age_limit}+`;
    },
    getFilmThumbnail(film) {
      return _.get(film, "aws_thumbnail.meta.location", "");
    },
  },
};
</script>

<style scoped>
::v-deep .v-slide-group__prev,
::v-deep .v-slide-group__next {
  position: absolute;
  height: 100%;
  transition: all 0.3s linear;
  background: rgba(0, 0, 0, 0);
  min-width: 30px !important;
  z-index: 999;
}
::v-deep .v-slide-group__prev .v-icon,
::v-deep .v-slide-group__next .v-icon {
  opacity: 0 !important;
}
::v-deep .v-slide-group__prev {
  left: 0;
}
::v-deep .v-slide-group__next {
  right: 0;
}
::v-deep .v-item-group:hover .v-slide-group__prev {
  background: rgba(0, 0, 0, 0.2);
}
::v-deep .v-item-group:hover .v-slide-group__next {
  background: rgba(0, 0, 0, 0.2);
}
::v-deep .v-item-group:hover .v-slide-group__prev .v-icon {
  opacity: 1 !important;
}
::v-deep .v-item-group:hover .v-slide-group__next .v-icon {
  opacity: 1 !important;
}
</style>
