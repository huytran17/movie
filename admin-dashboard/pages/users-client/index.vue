<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn
          depressed
          dense
          color="primary"
          @click="$router.push(localePath('/users-client/new'))"
        >
          <span class="text-body-2">
            <span class="app-body">
              <span v-html="$t('Thêm người dùng')"></span>
            </span>
          </span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <BaseUserTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BaseUserTable from "@/pages/users-client/widget/BaseUserTable";

export default {
  name: "UsersClient",
  components: { BaseUserTable },
};
</script>

<style></style>
