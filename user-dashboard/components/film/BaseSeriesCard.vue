<template>
  <v-card
    class="my-4 mx-1 pa-2 position-relative no-border-radius no-box-shadow w-100 h-100 d-flex flex-column"
    @click="$router.push(localePath(`/film/series/${series_item._id}`))"
  >
    <v-img
      :src="getSeriesThumbnail(series_item)"
      :alt="series_item.title"
      cover
      class="no-border-radius"
    >
    </v-img>

    <div class="text-body-1 mt-2 series-title">
      <span class="app-title">
        <span v-html="series_item.title"></span>
      </span>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "BaseSeriesCard",
  props: {
    series_item: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  methods: {
    getSeriesThumbnail(series) {
      return _.get(series, "aws_thumbnail.meta.location", "");
    },
  },
};
</script>

<style scoped>
.series-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
