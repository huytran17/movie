<template>
  <div>
    <BaseTableLoader v-if="user_loading" />
    <v-data-table
      v-else
      :headers="headers"
      :items="get_users"
      :search="search"
      :items-per-page="15"
    >
      <template v-slot:item.user_tools="{ item }">
        <v-btn icon @click="deleteUserConfirmDialog({ user: item })">
          <v-icon color="red">mdi-delete-forever</v-icon>
        </v-btn>
      </template>

      <template v-slot:item.full_name="{ item }">
        <div class="text-body-2 primary--text">
          <span class="app-title">
            {{ item.first_name }} {{ item.last_name }}
          </span>
        </div>
      </template>

      <template v-slot:item.created_at="{ item }">
        {{ $moment(item.created_at).format("DD-MM-YYYY") }}
      </template>

      <template v-slot:item.updated_at="{ item }">
        {{ $moment(item.updated_at).format("DD-MM-YYYY") }}
      </template>

      <template v-slot:item.birthday="{ item }">
        <span v-if="item.birthday">
          {{ $moment(item.birthday).format("DD-MM-YYYY") }}
        </span>
      </template>

      <template v-slot:item.age="{ item }">
        <span v-if="item.birthday">
          {{ $moment().diff(item.birthday, "years", false) }}
        </span>
      </template>
    </v-data-table>

    <ConfirmDialog
      :show_confirm_dialog="show_confirm_dialog"
      :content="confirm_content"
      :action="deleteUser"
      @close-dialog="show_confirm_dialog = false"
    />
  </div>
</template>

<script>
import userMixins from "@/mixins/user";
import ConfirmDialog from "@/components/ConfirmDialog";
import BaseTableLoader from "@/components/loaders/BaseTableLoader";
export default {
  name: "BaseUserTable",
  mixins: [userMixins],
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
            text: this.$t("User name"),
            align: "start",
            filterable: false,
            value: "full_name",
            width: 200,
          },
          {
            text: this.$t("Email"),
            align: "start",
            filterable: false,
            value: "email",
            width: 250,
          },
          {
            text: this.$t("Birthday"),
            align: "start",
            filterable: false,
            value: "birthday",
            width: 250,
          },
          {
            text: this.$t("Age"),
            align: "start",
            filterable: false,
            value: "age",
            width: 250,
          },
          {
            text: this.$t("Phone number"),
            align: "start",
            filterable: false,
            value: "phone_number",
            width: 200,
          },
          {
            text: this.$t("Joined at"),
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
      show_confirm_dialog: false,
      confirm_content: "",
      choosen_user: null,
    };
  },
  computed: {
    get_users() {
      return this.users;
    },
  },
  methods: {
    async deleteUser() {
      const { is_error, message } = await this.DELETE_USER({
        user_id: this.choosen_user._id,
      });

      if (!!is_error) {
        this.$toast.error(this.$t(message));
        return;
      }
      this.$toast.success(this.$t("Deleted user successfully!"));
      this.show_confirm_dialog = false;
      await this.GET_USERS();
    },

    async deleteUserConfirmDialog({ user }) {
      this.confirm_content = `Bạn có muốn xóa người dùng <b>${user.first_name} ${user.last_name}</b> không?`;
      this.show_confirm_dialog = true;
      this.choosen_user = user;
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
