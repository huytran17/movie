<template>
  <div>
    <BaseTableLoader v-if="series_loading" />
    <v-data-table
      v-else
      :headers="headers"
      :items="get_series"
      :search="search"
      :items-per-page="15"
    >
      <template v-slot:item.title="{ item }">
        <div
          class="text-body-2 primary--text clickable"
          @click="$router.push(localePath(`/series-client/${item._id}`))"
        >
          <span class="app-title">
            <span v-html="$t(item.title)"></span>
          </span>
        </div>
      </template>

      <template v-slot:item.series_tools="{ item }">
        <v-btn
          icon
          @click="$router.push(localePath(`/series-client/${item._id}`))"
        >
          <v-icon color="primary">mdi-grease-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="openDeleteSeriesConfirmDialog({ series: item })">
          <v-icon color="red">mdi-delete-forever</v-icon>
        </v-btn>
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
      :action="deleteSeries"
      @close-dialog="show_confirm_dialog = false"
    />
  </div>
</template>

<script>
import seriesMixins from "@/mixins/series";
import BaseTableLoader from "@/components/loaders/BaseTableLoader";
export default {
  name: "BaseSeriesTable",
  mixins: [seriesMixins],
  components: {
    BaseTableLoader,
  },
  props: {
    headers: {
      type: Array,
      default() {
        return [
          {
            text: "Title",
            align: "start",
            filterable: false,
            value: "title",
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
            align: "center",
            filterable: false,
            value: "series_tools",
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
      choosen_series: null,
    };
  },
  computed: {
    get_series() {
      return this.series_array;
    },
  },
  methods: {
    async deleteSeries() {
      const series_id = _.get(this.choosen_series, "_id", "");
      const [{ is_error, message }] = await Promise.all([
        this.DELETE_SERIES({ series_id }),
        this.GET_SERIES_ARRAY(),
      ]);
      if (!!is_error) {
        this.$toast.error(this.$t(message));
        return;
      }
      this.$toast.success(this.$t("Deleted series successfully!"));
      this.show_confirm_dialog = false;
    },

    async openDeleteSeriesConfirmDialog({ series }) {
      this.confirm_content = `Bạn có muốn xóa series <b>${series.title}</b> không?`;
      this.show_confirm_dialog = true;
      this.choosen_series = series;
    },
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      await this.GET_SERIES_ARRAY();
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
