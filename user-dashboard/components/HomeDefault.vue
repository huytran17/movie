<template>
  <div>
    <AppBar @toggle-drawer="is_open_drawer = !is_open_drawer" />

    <Drawer :nav_items="nav_items" :is_open_drawer="is_open_drawer" />

    <LeftSideBox />
  </div>
</template>

<script>
import AppBar from "@/components/AppBar";
import LeftSideBox from "@/components/LeftSideBox";
import Drawer from "@/components/Drawer";

export default {
  name: "HomeDefault",
  components: {
    LeftSideBox,
    Drawer,
    AppBar,
  },
  data() {
    return {
      nav_items: [
        { label: "Home", icon: "mdi-home" },
        { label: "Account", icon: "mdi-account" },
      ],
      is_open_drawer: false,
    };
  },
};
</script>

<style></style>
