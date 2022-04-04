<template>
  <v-app light>
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
