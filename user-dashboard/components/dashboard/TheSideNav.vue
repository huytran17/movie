<template>
  <div>
    <div class="nav-icon">
      <v-app-bar-nav-icon
        large
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
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

        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item @click="logout" class="py-1">
            <v-icon color="#546E7A" class="mr-3">mdi-logout-variant</v-icon>
            <v-list-item-title>
              <span v-html="$t('Logout')"> </span>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import systemMixins from "@/mixins/system";
import authMixins from "@/mixins/auth";

export default {
  name: "TheSideNav",
  mixins: [systemMixins, authMixins],
  props: {
    nav_items: {
      type: Array,
      default() {
        return [
          {
            text: "Trang Chủ",
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
          {
            text: "Phim Bộ",
            value: "series",
            route: "/film/series",
          },
          {
            text: "Phim Hình Sự",
            value: "criminal",
            route: "/film/criminal",
          },
          {
            text: "Phim Âu - Mỹ",
            value: "usuk",
            route: "/film/usuk",
          },
          {
            text: "Phim Hài",
            value: "comedy",
            route: "/film/comedy",
          },
          {
            text: "Phim Trẻ Em",
            value: "kid",
            route: "/film/kid",
          },
          {
            text: "Phim Kinh Dị",
            value: "horror",
            route: "/film/horror",
          },
          {
            text: "Phim Viễn Tưởng",
            value: "fiction",
            route: "/film/fiction",
          },
          {
            text: "Phim Tâm Lý",
            value: "mentality",
            route: "/film/mentality",
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
  methods: {
    async logout() {
      await this.LOGOUT();
    },
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
