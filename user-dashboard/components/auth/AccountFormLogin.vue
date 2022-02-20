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
        @input="setLoginData($event, 'email')"
      ></v-text-field>
      <v-text-field
        type="password"
        :label="$t('Password')"
        required
        :rules="passwordRules"
        @input="setLoginData($event, 'password')"
      ></v-text-field>
      <div class="d-flex justify-center mt-4">
        <v-btn color="primary" outlined @click="login">
          {{ $t("Login") }}
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import authMixin from "@/mixins/auth";
export default {
  name: "AccountForm",
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
    setLoginData(data, path) {
      this.SET_LOGIN_DATA({ data, path });
    },
    /**
     * login
     */
    async login() {
      try {
        if (!this.is_valid_data) {
          return;
        }

        await this.LOGIN();
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
