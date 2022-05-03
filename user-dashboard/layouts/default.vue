<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-main>
      <TheSideNav />
      <div class="h-100">
        <nuxt />
        <BaseUserCompleteProfile
          :show_dialog="show_complete_profile_dialog"
          :action="updateUser"
          @close-user-complete-profile-dialog="
            show_complete_profile_dialog = false
          "
        />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import TheSideNav from "@/components/dashboard/TheSideNav";
import BaseUserCompleteProfile from "@/components/dialogs/BaseUserCompleteProfile";
import authMixin from "@/mixins/auth";
import userMixins from "@/mixins/user";

export default {
  name: "DefaultLayout",
  mixins: [authMixin, userMixins],
  components: {
    TheSideNav,
    BaseUserCompleteProfile,
  },
  data() {
    return {
      show_complete_profile_dialog: false,
    };
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    async updateUser() {
      await this.UPDATE_USER({ user: this.user });
      this.show_complete_profile_dialog = false;
    },
  },
  async fetch() {
    try {
      await this.GET_ME();

      const has_birthday = _.get(this.user, "birthday");
      const all_completed = !!has_birthday;

      if (!all_completed) {
        this.show_complete_profile_dialog = true;
      }
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
