<template>
  <v-app>
    <v-main>
      <TheSideNav />
      <div class="h-100">
        <nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import TheSideNav from "@/components/dashboard/TheSideNav";
import authMixin from "@/mixins/auth";

export default {
  name: "DefaultLayout",
  mixins: [authMixin],
  components: {
    TheSideNav,
  },
  async fetch() {
    try {
      await Promise.all([this.GET_ME()]);
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
