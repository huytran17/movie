<template>
  <v-container fluid>
    <HomeSlider />
  </v-container>
</template>

<script>
import authMixin from "@/mixins/auth";
import HomeSlider from "@/components/dashboard/HomeSlider";

export default {
  name: "IndexPage",
  layout: "default",
  mixins: [authMixin],
  components: { HomeSlider },
  async fetch() {
    try {
      await this.VERIFY();
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
