<template>
  <v-container fluid>
    <HomeSlider />
    <ListFilm title="Phổ biến" />
    <ListFilm title="Phổ biến" />
    <ListFilm title="Phổ biến" />
    <ListFilm title="Phổ biến" />
  </v-container>
</template>

<script>
import authMixin from "@/mixins/auth";
import HomeSlider from "@/components/dashboard/HomeSlider";
import ListFilm from "@/components/dashboard/ListFilm";

export default {
  name: "IndexPage",
  layout: "default",
  mixins: [authMixin],
  components: { HomeSlider, ListFilm },
  async fetch() {
    try {
      await this.VERIFY();
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
