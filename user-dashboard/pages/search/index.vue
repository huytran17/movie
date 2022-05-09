<template>
  <BaseFilmsList :films_list="films" />
</template>

<script>
import filmMixins from "@/mixins/film";
import BaseFilmsList from "@/components/film/BaseFilmsList";

export default {
  name: "SearchFilms",
  mixins: [filmMixins],
  components: { BaseFilmsList },
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
