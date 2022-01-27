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

    <LeftSideBox />

    <ContactDialog />
  </v-container>
</template>

<script>
import AppBar from "@/components/AppBar";
import LeftSideBox from "@/components/LeftSideBox";
import Drawer from "@/components/Drawer";
import BottomNav from "@/components/BottomNav";
import ContactDialog from "@/components/ContactDialog";

export default {
  name: "HomeDefault",
  components: {
    LeftSideBox,
    Drawer,
    BottomNav,
    AppBar,
    ContactDialog,
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
