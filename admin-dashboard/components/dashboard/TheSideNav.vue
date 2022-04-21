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
            @click="$router.push(localePath(`/admin/${user._id}`))"
            class="py-1"
          >
            <v-img
              v-if="avatar_url"
              :src="avatar_url"
              width="36px"
              :alt="$t('no avatar')"
            ></v-img>
            <v-icon v-else class="mr-3" color="#D32F2F">mdi-crown</v-icon>
            <v-list-item-title>
              <span v-html="user_fullname"> </span>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item
            v-for="item in list_items"
            :key="item.value"
            @click="$router.push(localePath(item.path))"
            class="py-1"
          >
            <v-icon :color="item.color" class="mr-3">{{ item.icon }}</v-icon>
            <v-list-item-title>
              <span v-html="$t(item.text)"> </span>
            </v-list-item-title>
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
  components: {},
  props: {
    list_items: {
      type: Array,
      default: () => [
        {
          text: "Dashboard",
          value: "dashboard",
          path: "/",
          icon: "mdi-home-analytics",
          color: "#64DD17",
        },
        {
          text: "Admin",
          value: "admin",
          path: "/admin",
          icon: "mdi-shield-crown-outline",
          color: "#039BE5",
        },
        {
          text: "User",
          value: "user",
          path: "/users-client",
          icon: "mdi-account-group-outline",
          color: "#D81B60",
        },
        {
          text: "Series",
          value: "series",
          path: "/series-client",
          icon: "mdi-filmstrip-box-multiple",
          color: "#E040FB",
        },
        {
          text: "Film",
          value: "film",
          path: "/films-client",
          icon: "mdi-movie-roll",
          color: "#00ACC1",
        },
        {
          text: "Feedback",
          value: "feedback",
          path: "/feedbacks-client",
          icon: "mdi-comment-quote-outline",
          color: "#FFFF00",
        },
      ],
    },
  },
  data() {
    return {
      drawer: true,
    };
  },
  computed: {
    avatar_url() {
      const has_aws_location = _.get(this.user, "aws_avatar.meta.location", "");
      return has_aws_location;
    },
    user_fullname() {
      return `${this.user.first_name} ${this.user.last_name}`;
    },
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
