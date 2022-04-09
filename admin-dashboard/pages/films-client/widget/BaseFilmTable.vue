<template>
  <BaseTableLoader v-if="user_loading" />
  <v-data-table
    v-else
    :headers="headers"
    :items="get_films"
    :search="search"
    :items-per-page="15"
  >
    <template v-slot:item.film_tools="{ item }">
      <v-btn icon @click="$router.push(localePath(`/film/${item._id}`))">
        <v-icon color="red">mdi-grease-pencil</v-icon>
      </v-btn>
      <v-btn icon @click="deleteFilm({ id: item._id })">
        <v-icon color="red">mdi-delete-forever</v-icon>
      </v-btn>
    </template>

    <template v-slot:item.title="{ item }">
      <a
        @click="$router.push(localePath(`/film/${item._id}`))"
        class="text-body-2 primary--text"
      >
        <span class="app-title">
          {{ item.title }}
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
import userMixins from "@/mixins/user";
import BaseTableLoader from "@/components/loaders/BaseTableLoader";
export default {
  name: "BaseFilmTable",
  mixins: [userMixins],
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
            text: "Description",
            align: "start",
            filterable: false,
            value: "description",
            width: 250,
          },
          {
            text: "Url",
            align: "start",
            filterable: false,
            value: "url",
            width: 200,
          },
          {
            text: "Slug",
            align: "start",
            filterable: false,
            value: "slug",
            width: 250,
          },
          {
            text: "Thumnail url",
            align: "start",
            filterable: false,
            value: "created_at",
            width: 250,
          },
          {
            text: "Manufactured at",
            align: "start",
            filterable: false,
            value: "manufactured_at",
            width: 250,
          },
          {
            text: "View count",
            align: "start",
            filterable: false,
            value: "view_count",
            width: 150,
            sortable: false,
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
            value: "film_tools",
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
    get_films() {
      return this.films;
    },
  },
  methods: {
    async deleteFilm({ id }) {
      await this.DELETE_FILM({ film_id: id });
    },
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      await this.GET_FILMS();
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
