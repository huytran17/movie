<template>
  <v-row class="px-3">
    <v-col
      v-for="(film, index) in films_list"
      :key="index"
      cols="6"
      sm="3"
      md="2"
      class="px-0"
    >
      <BaseFilmCard :film_item="film" />
    </v-col>
  </v-row>
</template>

<script>
import BaseFilmCard from "@/components/film/BaseFilmCard";
export default {
  name: "BaseFilmsList",
  components: {
    BaseFilmCard,
  },
  props: {
    films_list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style></style>
