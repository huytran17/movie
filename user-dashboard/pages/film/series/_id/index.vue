<template>
  <BaseFilmsList :films_list="films" />
</template>

<script>
import BaseFilmsList from "@/components/film/BaseFilmsList";
import seriesMixins from "@/mixins/series";
import filmMixins from "@/mixins/film";

export default {
  name: "Films",
  mixins: [seriesMixins, filmMixins],
  components: { BaseFilmsList },
  async fetch() {
    try {
      const series_id = this.$route.params.id;
      await this.GET_FILMS_PAGINATED({
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
