<template>
  <BaseNoContent v-if="films.length <= 0" />
  <BaseFilmsList2 v-else :films_list="films" :show_title="true" />
</template>

<script>
import filmMixins from "@/mixins/film";
import BaseFilmsList2 from "@/components/film/BaseFilmsList2";
import BaseNoContent from "@/components/BaseNoContent";

export default {
  name: "SearchFilms",
  mixins: [filmMixins],
  components: { BaseFilmsList2, BaseNoContent },
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
