<template>
  <BaseFilmsList :films_list="films" />
</template>

<script>
import BaseFilmsList from "@/components/film/BaseFilmsList";
import filmMixins from "@/mixins/film";

export default {
  name: "Series",
  mixins: [filmMixins],
  components: { BaseFilmsList },
  async fetch() {
    try {
      await this.GET_FILMS_PAGINATED({
        series: "true",
      });
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style></style>
