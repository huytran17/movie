<template>
  <BaseSeriesList :series_list="series_array" />
</template>

<script>
import BaseSeriesList from "@/components/film/BaseSeriesList";
import seriesMixins from "@/mixins/series";

export default {
  name: "Series",
  mixins: [seriesMixins],
  components: { BaseSeriesList },
  async fetch() {
    try {
      await this.GET_SERIES_ARRAY_PAGINATED();
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style></style>
