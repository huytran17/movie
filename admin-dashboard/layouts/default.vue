<template>
  <v-app light>
    <v-main>
      <div class="d-flex justify-center">
        <v-img :src="logo" max-width="200"></v-img>
      </div>
      <div class="nav">
        <TheSideNav />
      </div>
      <div class="main mt-2">
        <nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import authMixin from "@/mixins/auth";

import TheSideNav from "@/components/dashboard/TheSideNav";

export default {
  name: "DefaultLayout",
  mixins: [authMixin],
  components: {
    TheSideNav,
  },
  data() {
    return {
      logo: require("@/assets/images/netflixlogo.png"),
    };
  },
  async fetch() {
    try {
      await this.GET_ME();
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style scoped></style>
