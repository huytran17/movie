<template>
  <BaseTableLoader v-if="feedback_loading" />
  <v-data-table
    v-else
    :headers="headers"
    :items="get_feedbacks"
    :search="search"
    :items-per-page="15"
  >
    <template v-slot:item.feedback_tools="{ item }">
      <v-btn icon @click="deleteFeedback({ id: item._id })">
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
</template>

<script>
import feedbackMixins from "@/mixins/feedback";
import BaseTableLoader from "@/components/loaders/BaseTableLoader";
export default {
  name: "BaseFeedbackTable",
  mixins: [feedbackMixins],
  components: {
    BaseTableLoader,
  },
  props: {
    headers: {
      type: Array,
      default() {
        return [
          {
            text: "Content",
            align: "start",
            filterable: false,
            value: "content",
            width: 200,
          },
          {
            text: "Star count",
            align: "start",
            filterable: false,
            value: "star_count",
            width: 200,
          },
          {
            text: "Created by",
            align: "start",
            filterable: false,
            value: "user_full_name",
            width: 250,
          },
          {
            text: "Feedback on",
            align: "start",
            filterable: false,
            value: "feedback_on",
            width: 200,
          },

          {
            text: "Created at",
            align: "start",
            filterable: false,
            value: "created_at",
            width: 250,
          },
          {
            text: "Last updated at",
            align: "start",
            filterable: false,
            value: "updated_at",
            width: 250,
          },
          {
            text: "Tools",
            align: "start",
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
    };
  },
  computed: {
    get_feedbacks() {
      return this.feedbacks;
    },
  },
  methods: {
    async deleteFeedback({ id }) {
      await Promise.all([
        this.DELETE_FEEDBACK({ feedback_id: id }),
        this.GET_FEEDBACKS(),
      ]);
    },
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      await this.GET_FEEDBACKS();
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
