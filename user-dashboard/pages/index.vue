<template>
  <v-container fluid>
    <HomeSlider />
    <PopulateFilm />
  </v-container>
</template>

<script>
import authMixin from "@/mixins/auth";
import HomeSlider from "@/components/dashboard/HomeSlider";
import PopulateFilm from "@/components/dashboard/PopulateFilm";

export default {
  name: "IndexPage",
  layout: "default",
  mixins: [authMixin],
  components: { HomeSlider, PopulateFilm },
  async fetch() {
    try {
      await this.VERIFY();
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
