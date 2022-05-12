<template>
  <BaseNoContent v-if="films.length" />
  <BaseFilmsList2 v-else :films_list="films" />
</template>

<script>
import BaseFilmsList2 from "@/components/film/BaseFilmsList2";
import BaseNoContent from "@/components/BaseNoContent";
import filmMixins from "@/mixins/film";

export default {
  name: "Films",
  mixins: [filmMixins],
  components: { BaseFilmsList2, BaseNoContent },
  async fetch() {
    try {
      await this.GET_FILMS({
        categories: ["comedy"],
        new_state: true,
      });
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style></style>
