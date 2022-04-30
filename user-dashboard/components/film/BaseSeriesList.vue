<template>
  <v-row class="px-3">
    <v-col
      v-for="(series, index) in series_list"
      :key="index"
      cols="6"
      sm="3"
      md="2"
      class="px-0"
    >
      <BaseSeriesCard :series_item="series" />
    </v-col>
  </v-row>
</template>

<script>
import BaseSeriesCard from "@/components/film/BaseSeriesCard";
export default {
  name: "BaseSeriesList",
  components: {
    BaseSeriesCard,
  },
  props: {
    series_list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style></style>
