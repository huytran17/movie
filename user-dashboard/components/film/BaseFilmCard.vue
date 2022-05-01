<template>
  <v-card
    class="my-1 mx-1 position-relative no-border-radius no-box-shadow"
    @click="$router.push(localePath(`/film/${film_item._id}`))"
  >
    <v-img
      :src="getFilmThumbnail(film_item)"
      :alt="film_item.title"
      cover
      class="no-border-radius"
    >
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: "BaseFilmCard",
  props: {
    film_item: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  methods: {
    getFilmThumbnail(film) {
      return _.get(film, "aws_thumbnail.meta.location", "");
    },
  },
};
</script>

<style></style>
