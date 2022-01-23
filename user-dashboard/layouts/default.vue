<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <AppBar />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar";

export default {
  name: "DefaultLayout",
  components: {
    AppBar,
  },
};
</script>
