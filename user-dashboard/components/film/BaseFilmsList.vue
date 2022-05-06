<template>
  <v-row class="px-3 my-4 gap-20">
    <v-col
      v-for="(film, index) in films_list"
      :key="index"
      cols="6"
      sm="3"
      md="2"
    >
      <BaseFilmCard
        :film_item="film"
        @open-notification-dialog="openNotificationDialog"
      />
    </v-col>

    <BaseNotificationDialog
      :show_notification_dialog="show_notification_dialog"
      @close-notification-dialog="show_notification_dialog = false"
      :content="notification_content"
    />
  </v-row>
</template>

<script>
import BaseNotificationDialog from "@/components/dialogs/BaseNotificationDialog";
import BaseFilmCard from "@/components/film/BaseFilmCard";
export default {
  name: "BaseFilmsList",
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
    openNotificationDialog({ age }) {
      this.notification_content = `Bạn chưa đủ ${age} tuổi để xem phim này.`;
      this.show_notification_dialog = true;
    },
  },
};
</script>

<style scoped>
.gap-20 {
  gap: 20px;
}
</style>
