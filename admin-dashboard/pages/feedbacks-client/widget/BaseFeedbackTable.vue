<template>
  <div>
    <BaseTableLoader v-if="feedback_loading" />
    <v-data-table
      v-else
      :headers="headers"
      :items="get_feedbacks"
      :search="search"
      :items-per-page="15"
    >
      <template v-slot:item.feedback_tools="{ item }">
        <v-btn icon @click="openDeleteFilmConfirmDialog({ feedback: item })">
          <v-icon color="red">mdi-delete-forever</v-icon>
        </v-btn>
      </template>

      <template v-slot:item.user_full_name="{ item }">
        <div class="text-body-2 primary--text">
          <span class="app-title">
            {{ item.user.first_name }} {{ item.user.last_name }}
          </span>
        </div>
      </template>

      <template v-slot:item.feedback_on="{ item }">
        <a
          class="text-body-2 primary--text"
          @click="$router.push(localePath(`/films-client/${item.film._id}`))"
        >
          <span class="app-title">
            {{ item.film.title }}
          </span>
        </a>
      </template>

      <template v-slot:item.created_at="{ item }">
        {{ $moment(item.created_at).format("DD-MM-YYYY") }}
      </template>

      <template v-slot:item.updated_at="{ item }">
        {{ $moment(item.updated_at).format("DD-MM-YYYY") }}
      </template>
    </v-data-table>

    <ConfirmDialog
      :show_confirm_dialog="show_confirm_dialog"
      :content="confirm_content"
      :action="deleteFeedback"
      @close-dialog="show_confirm_dialog = false"
    />
  </div>
</template>

<script>
import feedbackMixins from "@/mixins/feedback";
import ConfirmDialog from "@/components/ConfirmDialog";
import BaseTableLoader from "@/components/loaders/BaseTableLoader";

export default {
  name: "BaseFeedbackTable",
  mixins: [feedbackMixins],
  components: {
    BaseTableLoader,
    ConfirmDialog,
  },
  props: {
    headers: {
      type: Array,
      default() {
        return [
          {
            text: this.$t("Content"),
            align: "start",
            filterable: false,
            value: "content",
            width: 200,
          },
          {
            text: this.$t("Star count"),
            align: "start",
            filterable: false,
            value: "star_count",
            width: 200,
          },
          {
            text: this.$t("Created by"),
            align: "start",
            filterable: false,
            value: "user_full_name",
            width: 250,
          },
          {
            text: this.$t("Feedback on"),
            align: "start",
            filterable: false,
            value: "feedback_on",
            width: 200,
          },

          {
            text: this.$t("Created at"),
            align: "start",
            filterable: false,
            value: "created_at",
            width: 250,
          },
          {
            text: this.$t("Last updated at"),
            align: "start",
            filterable: false,
            value: "updated_at",
            width: 250,
          },
          {
            text: this.$t("Tools"),
            align: "center",
            filterable: false,
            value: "feedback_tools",
            width: 150,
            sortable: false,
          },
        ];
      },
    },
  },
  data() {
    return {
      search: null,
      show_confirm_dialog: false,
      confirm_content: "",
      choosen_feedback: null,
    };
  },
  computed: {
    get_feedbacks() {
      return this.feedbacks;
    },
  },
  methods: {
    async deleteFeedback() {
      const { is_error, message } = await this.DELETE_FEEDBACK({
        feedback_id: this.choosen_feedback._id,
      });

      if (!!is_error) {
        this.$toast.error(this.$t(message));
        return;
      }
      this.$toast.success(this.$t("Deleted feedback successfully!"));
      this.show_confirm_dialog = false;
      await this.GET_FEEDBACKS({
        new_state: true,
      });
    },
    async openDeleteFilmConfirmDialog({ feedback }) {
      this.confirm_content = `Bạn có muốn xóa feedback <b>${feedback.content}</b> không?`;
      this.show_confirm_dialog = true;
      this.choosen_feedback = feedback;
    },
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      await this.GET_FEEDBACKS({
        new_state: true,
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.SET_LOADING({ data: false });
    }
  },
};
</script>

<style scoped>
::v-deep .v-data-table__wrapper::-webkit-scrollbar {
  height: 1px !important;
}

/* Track */
::v-deep .v-data-table__wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::v-deep .v-data-table__wrapper::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::v-deep .v-data-table__wrapper::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
