<template>
  <v-app light>
    <v-main>
      <div class="nav">
        <TheSideNav />
      </div>
      <div class="main mt-14">
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
