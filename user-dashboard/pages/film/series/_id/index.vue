<template>
  <BaseFilmsList2 :films_list="films" />
</template>

<script>
import BaseFilmsList2 from "@/components/film/BaseFilmsList2";
import seriesMixins from "@/mixins/series";
import filmMixins from "@/mixins/film";

export default {
  name: "Films",
  mixins: [seriesMixins, filmMixins],
  components: { BaseFilmsList2 },
  async fetch() {
    try {
      const series_id = this.$route.params.id;
      await this.GET_FILMS({
        series: series_id,
        new_state: true,
      });
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style></style>
