<template>
  <div>
    <v-app-bar elevation="0" color="white">
      <div class="d-flex justify-between">
        <v-app-bar-nav-icon
          @click="drawer = true"
          class="mx-1"
        ></v-app-bar-nav-icon>
        <div class="d-flex flex-column justify-center">
          <v-img :src="logo" max-width="128" max-height="33"></v-img>
        </div>
      </div>
      <div class="d-flex" justify="between">
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
      <div class="d-flex icon-wrapper justify-between">
        <v-badge bordered color="error" content="3" overlap>
          <div class="icon">
            <v-icon size="21">mdi-cart-outline</v-icon>
          </div>
        </v-badge>
        <v-badge bordered color="error" content="3" overlap>
          <div class="icon">
            <v-icon size="21">mdi-message-text-outline</v-icon>
          </div>
        </v-badge>
        <v-badge bordered color="error" content="3" overlap>
          <div class="icon">
            <v-icon size="21">mdi-bell-ring-outline</v-icon>
          </div>
        </v-badge>

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
                    John Leider
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-caption text-sm-body-2"
                    >john@vuetifyjs.com</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list nav dense>
              <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item v-for="(item, i) in items" :key="i">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title> {{ item.text }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "AppBar",
  data() {
    return {
      drawer: false,
      group: null,
      logo: require("@/assets/images/logo.png"),
      logo_mobile: require("@/assets/images/logo-mobile.png"),
      search: null,
      user: {
        initials: "JD",
        fullName: "John Doe",
        email: "john.doe@doe.com",
      },
      search_placeholder: this.$t("Search for Friends , Videos and more.."),
      selectedItem: 0,
      items: [
        { text: "My Files", icon: "mdi-folder" },
        { text: "Shared with me", icon: "mdi-account-multiple" },
        { text: "Starred", icon: "mdi-star" },
        { text: "Recent", icon: "mdi-history" },
        { text: "Offline", icon: "mdi-check-circle" },
        { text: "Uploads", icon: "mdi-upload" },
        { text: "Backups", icon: "mdi-cloud-upload" },
      ],
    };
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
.icon {
  padding: 8px;
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
</style>
