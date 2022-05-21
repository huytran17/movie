<template>
  <v-app>
    <v-main>
      <v-row class="d-flex justify-center">
        <v-col cols="12" md="4" class="pa-0"> </v-col>
        <v-col cols="12" md="4" class="d-flex justify-center pb-0">
          <v-img :src="logo" max-width="200"></v-img>
        </v-col>
        <v-col
          cols="12"
          md="4"
          class="d-flex flex-column justify-center pt-md-3 pt-0 pb-3 pb-md-0"
        >
          <div class="px-3">
            <v-text-field
              :placeholder="
                $t('Search by title, actors, director, category, tags')
              "
              filled
              rounded
              dense
              hide-details
              append-icon="mdi-magnify"
              v-model="query"
              @click:append="goToSearchPage"
            ></v-text-field>
          </div>
        </v-col>
      </v-row>
      <TheSideNav />
      <div class="pb-5">
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
import filmMixins from "@/mixins/film";

export default {
  name: "DefaultLayout",
  mixins: [authMixin, userMixins, filmMixins],
  components: {
    TheSideNav,
    BaseUserCompleteProfile,
  },
  data() {
    return {
      show_complete_profile_dialog: false,
      logo: require("@/assets/images/netflixlogo.png"),
      query: "",
    };
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    async goToSearchPage() {
      if (!this.query) {
        return;
      }
      const path = this.$route.path;
      const is_search_path = path === "/search";
      if (!is_search_path) {
        return this.$router.push(
          this.localePath(`/search?query=${this.query}`)
        );
      }

      await this.GET_FILMS({
        query: this.query,
        new_state: true,
      });
    },
    async updateUser() {
      const has_birthday = _.get(this.user, "birthday");
      if (!has_birthday) {
        this.updateUserObject({
          variable_path: "birthday",
          data: new Date(Date.now()).toISOString().substr(0, 10),
        });
      }
      await this.UPDATE_USER({ user: this.user });
      location.reload();
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
<style scoped>
::v-deep .v-input__control {
  margin: auto 0;
}
</style>
