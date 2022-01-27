<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <HomeDefault />
      </v-container>
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
