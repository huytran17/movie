<template>
  <v-navigation-drawer
    v-if="!is_smaller_than_1025"
    permanent
    clipped
    app
    expand-on-hover
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

  <v-navigation-drawer
    v-else
    v-model="drawer"
    absolute
    app
    clipped
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
      drawer: false,
    };
  },
  watch: {
    is_open_drawer() {
      this.drawer = !this.drawer;
    },
  },
};
</script>

<style></style>
