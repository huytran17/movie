<template>
  <v-navigation-drawer
    v-model="local_show_drawer"
    absolute
    temporary
    class="no-box-shadow"
  >
    <v-list nav dense>
      <v-list-item-group active-class="deep-purple--text text--accent-4">
        <v-list-item v-for="(nav_item, index) in nav_items" :key="index">
          <v-list-item-icon>
            <v-icon>{{ nav_item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ nav_item.label }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import systemMixins from "@/mixins/system";

export default {
  name: "Drawer",
  mixins: [systemMixins],
  props: {
    nav_items: {
      type: Array,
      default() {
        return [];
      },
    },
    is_open_drawer: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      local_show_drawer: false,
    };
  },
  watch: {
    local_show_drawer(data) {
      this.SET_SHOW_DRAWER({ data });
    },
    show_drawer(data) {
      this.local_show_drawer = data;
    },
  },
};
</script>

<style></style>
