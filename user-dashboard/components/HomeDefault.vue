<template>
  <v-container fluid>
    <AppBar
      @toggle-drawer="is_open_drawer = !is_open_drawer"
      :user="user"
      :user_menu_items="user_menu_items"
      :app_bar_icons="app_bar_icons"
    />

    <Drawer :nav_items="nav_items" :is_open_drawer="is_open_drawer" />

    <BottomNav
      :app_bar_icons="app_bar_icons"
      :user="user"
      :user_menu_items="user_menu_items"
    />

    <div class="d-flex justify-between">
      <div class="pl-2">
        <nuxt />
      </div>
      <div>
        <LeftSideBox v-if="!smaller_than_1025" />
      </div>
    </div>
  </v-container>
</template>

<script>
import systemMixins from "@/mixins/system";
import AppBar from "@/components/AppBar";
import LeftSideBox from "@/components/LeftSideBox";
import Drawer from "@/components/Drawer";
import BottomNav from "@/components/BottomNav";

export default {
  name: "HomeDefault",
  mixins: [systemMixins],
  components: {
    LeftSideBox,
    Drawer,
    BottomNav,
    AppBar,
  },
  data() {
    return {
      nav_items: [
        { label: "Home", icon: "mdi-home" },
        { label: "Account", icon: "mdi-account" },
      ],
      is_open_drawer: false,
      user: {
        initials: "HT",
        username: "Huy Tran",
        email: "huytran.13022k@gmail.com",
      },
      user_menu_items: [
        { label: "My Files", icon: "mdi-folder" },
        { label: "Shared with me", icon: "mdi-account-multiple" },
        { label: "Starred", icon: "mdi-star" },
        { label: "Recent", icon: "mdi-history" },
        { label: "Offline", icon: "mdi-check-circle" },
        { label: "Uploads", icon: "mdi-upload" },
        { label: "Backups", icon: "mdi-cloud-upload" },
      ],
      app_bar_icons: [
        {
          amount: 3,
          icon: "mdi-cart-outline",
          label: "Cart",
        },
        {
          amount: 5,
          icon: "mdi-message-text-outline",
          label: "Message",
        },
        {
          amount: 9,
          icon: "mdi-bell-ring-outline",
          label: "Notification",
        },
      ],
    };
  },
};
</script>

<style></style>
