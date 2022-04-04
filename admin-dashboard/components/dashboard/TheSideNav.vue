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
            v-for="item in list_items"
            :key="item.value"
            @click="$router.push(localePath(item.path))"
          >
            <v-list-item-title>{{ $t(item.text) }}</v-list-item-title>
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
  components: {},
  props: {
    list_items: {
      type: Array,
      default: () => [
        {
          text: "Dashboard",
          value: "dashboard",
          path: "/",
        },
        {
          text: "User",
          value: "user",
          path: "/user",
        },
        {
          text: "Film",
          value: "film",
          path: "/film",
        },
      ],
    },
  },
  data() {
    return {
      drawer: true,
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
