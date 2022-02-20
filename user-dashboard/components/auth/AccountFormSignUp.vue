<template>
  <div>
    <div class="d-flex justify-center">
      <v-img :src="logo" max-width="150px"></v-img>
    </div>
    <v-form v-model="is_valid_data" lazy-validation>
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
    </v-form>
  </div>
</template>

<script>
import authMixin from "@/mixins/auth";
export default {
  name: "AccountFormSignup",
  mixins: [authMixin],
  data() {
    return {
      is_valid_data: false,
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
    async signup() {
      try {
        if (!this.is_valid_data) {
          return;
        }

        await this.SIGN_UP().then(() =>
          this.$router.push(this.localePath("/login"))
        );
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
