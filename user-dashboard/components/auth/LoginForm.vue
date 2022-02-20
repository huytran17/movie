<template>
  <div class="px-10 py-5 h-100">
    <v-row class="h-100">
      <v-col cols="12" sm="7" md="8" class="d-none d-sm-block">
        <v-img :src="login_background" class="w-100 h-100"> </v-img>
      </v-col>
      <v-col
        cols="12"
        sm="5"
        md="4"
        class="login-form d-flex flex-column pa-3 pa-sm-0 pl-2 pl-sm-3"
      >
        <div class="form pa-4 pa-sm-0 mt-7">
          <div>
            <AccountFormLogin />
          </div>
          <div>
            <SocialiteForm />
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import systemMixins from "@/mixins/system";
import AccountFormLogin from "@/components/auth/AccountFormLogin";
import SocialiteForm from "@/components/auth/SocialiteForm";

export default {
  name: "LoginForm",
  components: {
    AccountFormLogin,
    SocialiteForm,
  },
  mixins: [systemMixins],
  data() {
    return {
      login_background: require("@/assets/images/auth/login-background.jpg"),
    };
  },
};
</script>

<style scoped>
@media only screen and (max-width: 599px) {
  .login-form {
    background-image: url("assets/images/auth/login-background.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .form {
    background: #ffffff;
    border-radius: 4px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  }
}
</style>
