<template>
  <BaseTableLoader v-if="admin_loading" />
  <v-data-table
    v-else
    :headers="headers"
    :items="get_admins"
    :search="search"
    :items-per-page="15"
  >
    <template v-slot:item.admin_tools="{ item }">
      <v-btn icon @click="deleteAdmin({ id: item._id })">
        <v-icon color="red">mdi-delete-forever</v-icon>
      </v-btn>
    </template>

    <template v-slot:item.full_name="{ item }">
      <a
        @click="$router.push(localePath(`/admin/${item._id}`))"
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
import adminMixins from "@/mixins/admin";
import BaseTableLoader from "@/components/loaders/BaseTableLoader";
export default {
  name: "BaseAdminTable",
  mixins: [adminMixins],
  components: {
    BaseTableLoader,
  },
  props: {
    headers: {
      type: Array,
      default() {
        return [
          {
            text: "Admin name",
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
            text: "Type",
            align: "start",
            filterable: false,
            value: "type",
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
            text: "Address",
            align: "start",
            filterable: false,
            value: "address",
            width: 200,
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
            value: "admin_tools",
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
    get_admins() {
      return this.admins;
    },
  },
  methods: {
    async deleteAdmin({ id }) {
      await this.DELETE_ADMIN({ admin_id: id });
    },
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      await this.GET_ADMINS();
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
