<template>
  <div>
    <BaseTableLoader v-if="admin_loading" />
    <v-data-table
      v-else
      :headers="headers"
      :items="get_admins"
      :search="search"
      :items-per-page="15"
    >
      <template v-slot:item.admin_tools="{ item }">
        <v-btn
          v-if="shouldShowDeleteButton"
          icon
          @click="openDeleteAdminConfirmDialog({ admin: item })"
        >
          <v-icon color="red">mdi-delete-forever</v-icon>
        </v-btn>

        <v-btn
          v-if="shouldShowRestoreButton({ admin: item })"
          icon
          @click="openRestoreAdminConfirmDialog({ admin: item })"
        >
          <v-icon color="green">mdi-backup-restore</v-icon>
        </v-btn>
      </template>

      <template v-slot:item.full_name="{ item }">
        <a
          @click="editProfile({ user: item })"
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
      :action="is_open_restore_dialog ? restoreAdmin : deleteAdmin"
      @close-dialog="show_confirm_dialog = false"
    />
  </div>
</template>

<script>
import adminMixins from "@/mixins/admin";
import authMixins from "@/mixins/auth";

import BaseTableLoader from "@/components/loaders/BaseTableLoader";
import ConfirmDialog from "@/components/ConfirmDialog";
export default {
  name: "BaseAdminTable",
  mixins: [adminMixins, authMixins],
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
            text: this.$t("Admin name"),
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
            text: this.$t("Type"),
            align: "start",
            filterable: false,
            value: "type",
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
            text: this.$t("Address"),
            align: "start",
            filterable: false,
            value: "address",
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
      show_confirm_dialog: false,
      confirm_content: "",
      choosen_admin: null,
      is_open_restore_dialog: false,
    };
  },
  computed: {
    get_admins() {
      return this.admins;
    },
  },
  methods: {
    async openDeleteAdminConfirmDialog({ admin }) {
      this.is_open_restore_dialog = false;
      this.confirm_content = `Bạn có muốn xóa quản trị viên <b>${admin.first_name} ${admin.last_name}</b> không?`;
      this.show_confirm_dialog = true;
      this.choosen_admin = admin;
    },

    async openRestoreAdminConfirmDialog({ admin }) {
      this.is_open_restore_dialog = true;
      this.confirm_content = `Bạn có muốn khôi phục quản trị viên <b>${admin.first_name} ${admin.last_name}</b> không?`;
      this.show_confirm_dialog = true;
      this.choosen_admin = admin;
    },

    editProfile({ user }) {
      const should_disabled = !this.is_super_admin;
      if (should_disabled) {
        return;
      }
      this.$router.push(this.localePath(`/administrator/${user._id}`));
    },

    async deleteAdmin() {
      const { is_error, message } = await this.DELETE_ADMIN({
        admin_id: this.choosen_admin._id,
      });
      if (!!is_error) {
        this.$toast.error(this.$t(message));
        return;
      }
      this.$toast.success(this.$t("Deleted admin successfully!"));
      this.show_confirm_dialog = false;
      await this.GET_ADMINS();
    },

    async restoreAdmin() {
      await Promise.all([
        this.RESTORE_ADMIN({ admin_id: this.choosen_admin._id }),
        this.GET_ADMINS(),
      ]);

      this.show_confirm_dialog = false;
    },

    shouldShowDeleteButton() {
      return this.is_super_admin;
    },

    shouldShowRestoreButton({ admin }) {
      return this.is_super_admin && admin.deleted_at;
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
