<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn
          depressed
          dense
          color="primary"
          @click="$router.push(localePath('/series-client/new'))"
        >
          <span class="text-body-2">
            <span class="app-body">
              <span v-html="$t('Thêm Series')"></span>
            </span>
          </span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <BaseSeriesTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BaseSeriesTable from "@/pages/series-client/widget/BaseSeriesTable";
export default {
  name: "UsersClient",
  components: { BaseSeriesTable },
};
</script>

<style></style>
