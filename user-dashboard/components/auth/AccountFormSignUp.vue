<template>
  <div>
    <div class="d-flex justify-center">
      <v-img :src="logo" max-width="150px"></v-img>
    </div>
    <form>
      <v-text-field
        label="E-mail"
        type="email"
        required
        :rules="emailRules"
        @input="setSignUpData($event, 'email')"
      ></v-text-field>
      <v-text-field
        type="password"
        :label="$t('Password')"
        required
        :rules="passwordRules"
        @input="setSignUpData($event, 'password')"
      ></v-text-field>
      <v-text-field
        type="password"
        :label="$t('Re-Password')"
        required
        :rules="passwordConfirmationRules"
        @input="setSignUpData($event, 'password_confirmation')"
      ></v-text-field>
      <div class="d-flex justify-center mt-4">
        <v-btn color="primary" outlined @click="signup">
          {{ $t("Sign Up") }}
        </v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import authMixin from "@/mixins/auth";
export default {
  name: "AccountFormSignup",
  mixins: [authMixin],
  data() {
    return {
      logo: require("@/assets/images/logo.png"),
    };
  },
  methods: {
    /**
     * set login data
     */
    setSignUpData(data, path) {
      this.SET_SIGN_UP_DATA({ data, path });
    },
    /**
     * signup
     */
    signup() {
      console.log(this.login_data);
      console.log("s", this.sign_up_data);
      this.SIGN_UP();
    },
  },
};
</script>
