<template>
  <v-menu
    :bottom="!is_smaller_than_1025"
    :top="is_smaller_than_1025"
    min-width="200px"
    rounded
    offset-y
  >
    <template v-slot:activator="{ on }">
      <div>
        <v-btn icon v-on="on" id="btn_profile" v-if="!is_smaller_than_1025">
          <v-avatar color="brown" size="37">
            <span class="white--text text-sm-body-2 text-body-1">{{
              user.initials
            }}</span>
          </v-avatar>
        </v-btn>
        <v-avatar color="brown" size="37" v-on="on" v-else>
          <span class="white--text text-sm-body-2 text-body-1">{{
            user.initials
          }}</span>
        </v-avatar>
      </div>
    </template>
    <v-card class="no-box-shadow">
      <v-list class="d-flex">
        <v-list-item class="pr-0 pl-2 list-item-avatar-wrapper">
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
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
        <v-list-item-group color="primary">
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
                <v-list-item-title>{{ $t("Night Mode") }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-checkbox :input-value="active" color="primary"></v-checkbox>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import systemMixins from "@/mixins/system";

export default {
  name: "ProfileMenu",
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
  },
  methods: {
    /**
     * @description change the app theme
     */
    changeAppTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>

<style scoped>
::v-deep.v-menu__content {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px !important;
  -webkit-box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px !important;
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
