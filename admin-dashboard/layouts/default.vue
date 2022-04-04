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
import TheSideNav from "@/components/dashboard/TheSideNav";

export default {
  name: "DefaultLayout",
  components: {
    TheSideNav,
  },
};
</script>

<style scoped></style>
