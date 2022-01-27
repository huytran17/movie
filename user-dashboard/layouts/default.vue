<template>
  <v-app>
    <v-main>
      <HomeDefault />
    </v-main>
  </v-app>
</template>

<script>
import HomeDefault from "@/components/HomeDefault";

export default {
  name: "DefaultLayout",
  components: {
    HomeDefault,
  },
};
</script>
