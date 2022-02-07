<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="slide-x-reverse-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" text v-bind="attrs" v-on="on" class="px-0" small>
        <v-icon> mdi-dots-grid </v-icon></v-btn
      >
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="dialog = false"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <LeftSideBox />
    </v-card>
  </v-dialog>
</template>

<script>
import LeftSideBox from "@/components/LeftSideBox";

export default {
  name: "ContactDialog",
  components: {
    LeftSideBox,
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    };
  },
};
</script>

<style scoped>
::v-deep .v-btn::before {
  background-color: #ffffff !important;
}
</style>
