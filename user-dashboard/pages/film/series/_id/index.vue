<template>
  <BaseNoContent v-if="films.length <= 0" />
  <BaseFilmsList2 v-else :films_list="films" :show_title="true" />
</template>

<script>
import BaseFilmsList2 from "@/components/film/BaseFilmsList2";
import seriesMixins from "@/mixins/series";
import filmMixins from "@/mixins/film";
import BaseNoContent from "@/components/BaseNoContent";

export default {
  name: "Films",
  mixins: [seriesMixins, filmMixins],
  components: { BaseFilmsList2, BaseNoContent },
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
