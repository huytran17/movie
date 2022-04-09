<template>
  <div>
    <div class="nav-icon">
      <v-badge
        color="error"
        content="6"
        overlap
        right
        :offset-y="22"
        :offset-x="18"
      >
        <v-app-bar-nav-icon
          large
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </v-badge>
    </div>

    <v-navigation-drawer v-model="drawer" temporary top fixed>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item
            v-for="(nav_item, index) in nav_items"
            :key="index"
            @click="$router.push(localePath(nav_item.route))"
          >
            <v-list-item-icon>
              <v-icon v-text="nav_item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-html="nav_item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import systemMixins from "@/mixins/system";

export default {
  name: "TheSideNav",
  mixins: [systemMixins],
  props: {
    nav_items: {
      type: Array,
      default() {
        return [
          {
            text: "Trang chủ",
            value: "home",
            icon: "mdi-home",
            route: "/",
          },
          {
            text: "Tài khoản",
            value: "account",
            icon: "mdi-account",
            route: "/profile",
          },
        ];
      },
    },
  },
  data() {
    return {
      drawer: false,
    };
  },
};
</script>

<style scoped>
.nav-icon {
  position: fixed;
  top: 14px;
  left: 14px;
  z-index: 1;
}
::v-deep .v-navigation-drawer {
  z-index: 2;
}
</style>
