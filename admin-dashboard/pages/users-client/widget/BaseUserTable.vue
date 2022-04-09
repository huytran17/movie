<template>
  <BaseTableLoader v-if="user_loading" />
  <v-data-table
    v-else
    :headers="headers"
    :items="get_users"
    :search="search"
    :items-per-page="15"
  >
    <template v-slot:item.user_tools="{ item }">
      <v-btn icon @click="deleteUser({ id: item._id })">
        <v-icon color="red">mdi-delete-forever</v-icon>
      </v-btn>
    </template>

    <template v-slot:item.full_name="{ item }">
      <a
        @click="$router.push(localePath(`/user/${item._id}`))"
        class="text-body-2 primary--text"
      >
        <span class="app-title">
          {{ item.first_name }} {{ item.last_name }}
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
  name: "BaseUserTable",
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
            text: "User name",
            align: "start",
            filterable: false,
            value: "full_name",
            width: 200,
          },
          {
            text: "Email",
            align: "start",
            filterable: false,
            value: "email",
            width: 250,
          },
          {
            text: "Phone number",
            align: "start",
            filterable: false,
            value: "phone_number",
            width: 200,
          },
          {
            text: "Email verified at",
            align: "start",
            filterable: false,
            value: "email_verified_at",
            width: 250,
          },
          {
            text: "Joined at",
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
            value: "user_tools",
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
    get_users() {
      return this.users;
    },
  },
  methods: {
    async deleteUser({ id }) {
      await this.DELETE_USER({ user_id: id });
    },
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      await this.GET_USERS();
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
