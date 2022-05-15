<template>
  <BaseNoContent v-if="series_array.length <= 0" />
  <BaseSeriesList v-else :series_list="series_array" />
</template>

<script>
import BaseSeriesList from "@/components/film/BaseSeriesList";
import seriesMixins from "@/mixins/series";
import BaseNoContent from "@/components/BaseNoContent";

export default {
  name: "Series",
  mixins: [seriesMixins],
  components: { BaseSeriesList, BaseNoContent },
  async fetch() {
    try {
      await this.GET_SERIES_ARRAY();
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style></style>
