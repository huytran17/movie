<template>
  <v-bottom-navigation fixed grow v-if="is_smaller_than_1025">
    <v-btn v-for="(app_icon, index) in app_bar_icons" :key="index">
      <v-badge bordered color="error" :content="app_icon.amount" overlap>
        <div class="icon">
          <v-icon size="21">{{ app_icon.icon }}</v-icon>
        </div>
      </v-badge>
    </v-btn>
    <v-btn>
      <ProfileMenu :user="user" :user_menu_items="user_menu_items" />
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import systemMixins from "@/mixins/system";
import ProfileMenu from "@/components/ProfileMenu";

export default {
  name: "BottomNav",
  mixins: [systemMixins],
  components: {
    ProfileMenu,
  },
  props: {
    app_bar_icons: {
      type: Array,
      default() {
        return [];
      },
    },
    user: {
      type: Object,
      default() {
        return {};
      },
    },
    user_menu_items: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
::v-deep .v-btn:before {
  background-color: #ffffff !important;
}
::v-deep .v-ripple__container > * {
  background-color: #ffffff !important;
}
</style>
