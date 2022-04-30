<template>
  <BaseFilmsList :films_list="films" />
</template>

<script>
import BaseFilmsList from "@/components/film/BaseFilmsList";
import filmMixins from "@/mixins/film";

export default {
  name: "Films",
  mixins: [filmMixins],
  components: { BaseFilmsList },
  async fetch() {
    try {
      await this.GET_FILMS_PAGINATED({
        category: "documentary",
        new_state: true,
      });
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style></style>
