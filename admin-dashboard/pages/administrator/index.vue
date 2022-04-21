<template>
  <v-container>
    <div v-if="is_super_admin">
      <v-row>
        <v-col>
          <v-btn
            depressed
            dense
            color="primary"
            @click="$router.push(localePath('/administrator/new'))"
          >
            <span class="text-body-2">
              <span class="app-body">
                <span v-html="$t('Thêm quản trị viên')"></span>
              </span>
            </span>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <BaseAdminTable />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import BaseAdminTable from "@/pages/admin/widget/BaseAdminTable";
import authMixins from "@/mixins/auth";
export default {
  name: "UsersClient",
  mixins: [authMixins],
  components: { BaseAdminTable },
};
</script>

<style></style>
