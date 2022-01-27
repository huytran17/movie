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

        <v-menu bottom min-width="200px" rounded offset-y>
          <template v-slot:activator="{ on }">
            <div>
              <v-btn icon v-on="on" id="btn_profile">
                <v-avatar color="brown" size="37">
                  <span class="white--text text-sm-body-2 text-body-1">{{
                    user.initials
                  }}</span>
                </v-avatar>
              </v-btn>
            </div>
          </template>
          <v-card class="no-box-shadow">
            <v-list class="d-flex">
              <v-list-item class="pr-0 pl-2 list-item-avatar-wrapper">
                <v-list-item-avatar>
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/john.png"
                  ></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-list-item link class="pl-2">
                <v-list-item-content>
                  <v-list-item-title class="text-body-2 text-sm-body-1">
                    {{ user.username }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-caption text-sm-body-2">{{
                    user.email
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list nav dense>
              <v-list-item-group v-model="user_selected_item" color="primary">
                <v-list-item v-for="(item, i) in user_menu_items" :key="i">
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title> {{ item.label }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item @click="changeAppTheme()">
                  <template v-slot:default="{ active }">
                    <v-list-item-icon>
                      <v-icon>mdi-weather-night</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{
                        $t("Night Mode")
                      }}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-checkbox
                        :input-value="active"
                        color="primary"
                      ></v-checkbox>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import systemMixins from "@/mixins/system";

export default {
  name: "AppBar",
  mixins: [systemMixins],

  data() {
    return {
      logo: require("@/assets/images/logo.png"),
      logo_mobile: require("@/assets/images/logo-mobile.png"),
      search: null,
      user: {
        initials: "JD",
        fullName: "John Doe",
        email: "john.doe@doe.com",
      },
      search_placeholder: this.$t("Search for Friends , Videos and more.."),
      user_selected_item: 0,
      user_menu_items: [
        { label: "My Files", icon: "mdi-folder" },
        { label: "Shared with me", icon: "mdi-account-multiple" },
        { label: "Starred", icon: "mdi-star" },
        { label: "Recent", icon: "mdi-history" },
        { label: "Offline", icon: "mdi-check-circle" },
        { label: "Uploads", icon: "mdi-upload" },
        { label: "Backups", icon: "mdi-cloud-upload" },
      ],

      user: {
        username: "Huy Tran",
        email: "huytran.13022k@gmail.com",
      },
      app_bar_icons: [
        {
          amount: 3,
          icon: "mdi-cart-outline",
        },
        {
          amount: 5,
          icon: "mdi-message-text-outline",
        },
        {
          amount: 9,
          icon: "mdi-bell-ring-outline",
        },
      ],
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
::v-deep.v-menu__content {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px !important;
  -webkit-box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px !important;
}
::v-deep .v-navigation-is_open_drawer--is-mobile {
}
.icon {
  border-radius: 999px;
  background: #f0f2f5;
}
.icon-wrapper {
  width: 200px;
}
#btn_profile {
  max-width: 37px;
  max-height: 37px;
}
.list-item-avatar-wrapper {
  flex-basis: 70px;
  max-height: 70px;
}
.btn-app-bar-icon {
  padding: 20px;
}
</style>
