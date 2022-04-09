<template>
  <v-card
    id="line-chart-card"
    class="d-flex flex-column soft-box-shadow rounded-lg"
  >
    <v-skeleton-loader type="header, image"></v-skeleton-loader>
  </v-card>
</template>

<script>
import systemMixins from "@/mixins/system";
export default {
  name: "BaseLineChartLoader",
  mixins: [systemMixins],
};
</script>

<style scoped>
#line-chart-card {
  height: 265px !important;
  width: 100% !important;
}
::v-deep .v-skeleton-loader,
::v-deep .v-skeleton-loader__image {
  height: 100% !important;
}
</style>
