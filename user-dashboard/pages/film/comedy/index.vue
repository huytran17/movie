<template>
  <BaseFilmsList2 :films_list="films" />
</template>

<script>
import BaseFilmsList2 from "@/components/film/BaseFilmsList2";
import filmMixins from "@/mixins/film";

export default {
  name: "Films",
  mixins: [filmMixins],
  components: { BaseFilmsList2 },
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
