<template>
  <BaseFilmsList2 :films_list="films" />
</template>

<script>
import filmMixins from "@/mixins/film";
import BaseFilmsList2 from "@/components/film/BaseFilmsList2";

export default {
  name: "SearchFilms",
  mixins: [filmMixins],
  components: { BaseFilmsList2 },
  async fetch() {
    try {
      const query = this.$route.query.query;
      await this.GET_FILMS({
        query,
        new_state: true,
      });
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style></style>
