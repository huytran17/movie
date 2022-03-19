<template>
  <v-app>
    <v-main>
      <TheSideNav />
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import TheSideNav from "@/components/dashboard/TheSideNav";

export default {
  name: "DefaultLayout",
  components: {
    TheSideNav,
  },
};
</script>

<style scoped>
::v-deep#app {
  background: #000000 !important;
}
</style>
