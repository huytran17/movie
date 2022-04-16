<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn
          depressed
          dense
          color="primary"
          @click="$router.push(localePath('/admin/new'))"
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
  </v-container>
</template>

<script>
import BaseAdminTable from "@/pages/admin/widget/BaseAdminTable";
export default {
  name: "UsersClient",
  components: { BaseAdminTable },
};
</script>

<style></style>
