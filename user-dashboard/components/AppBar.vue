<template>
  <div>
    <v-app-bar elevation="0" app clipped-left color="white">
      <v-app-bar-nav-icon
        v-if="is_smaller_than_1025"
        @click.stop="toggleDrawer"
      ></v-app-bar-nav-icon>
      <div class="d-flex justify-between">
        <div class="d-flex flex-column justify-center">
          <nuxt-link to="/">
            <v-img :src="logo" max-width="128" max-height="33"></v-img>
          </nuxt-link>
        </div>
      </div>
      <div class="d-flex" justify="between" v-if="!is_smaller_than_800">
        <v-text-field
          hide-details
          filled
          rounded
          dense
          :placeholder="search_placeholder"
          prepend-inner-icon="mdi-magnify"
          v-model="search"
        ></v-text-field>
      </div>
      <div
        class="d-flex icon-wrapper justify-between"
        v-if="!is_smaller_than_1025"
      >
        <div v-for="(app_icon, index) in app_bar_icons" :key="index">
          <v-badge bordered color="error" :content="app_icon.amount" overlap>
            <div class="icon">
              <v-btn icon small class="btn-app-bar-icon" color="black">
                <v-icon size="21">{{ app_icon.icon }}</v-icon>
              </v-btn>
            </div>
          </v-badge>
        </div>
        <ProfileMenu :user="user" :user_menu_items="user_menu_items" />
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import systemMixins from "@/mixins/system";
import ProfileMenu from "@/components/ProfileMenu";

export default {
  name: "AppBar",
  components: {
    ProfileMenu,
  },
  mixins: [systemMixins],
  props: {
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
    app_bar_icons: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      logo: require("@/assets/images/logo.png"),
      logo_mobile: require("@/assets/images/logo-mobile.png"),
      search: null,
      search_placeholder: this.$t("Search for Friends , Videos and more.."),
      user_selected_item: 0,
    };
  },
  methods: {
    /**
     * @description change the app theme
     */
    changeAppTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    /**
     * @description toggle the drawer
     */
    toggleDrawer() {
      this.$emit("toggle-drawer");
    },
  },
};
</script>

<style scoped>
::v-deep .v-text-field {
  border-radius: 26px !important;
  width: 550px !important;
}
::v-deep .v-toolbar__content {
  width: 100% !important;
  justify-content: space-between;
}
.icon {
  border-radius: 999px;
  background: #f0f2f5;
}
.icon-wrapper {
  width: 200px;
}
.btn-app-bar-icon {
  padding: 20px;
}
</style>
