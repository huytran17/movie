<template>
  <div>
    <div class="d-flex justify-center">
      <v-img :src="logo" max-width="150px"></v-img>
    </div>
    <form>
      <v-text-field
        v-model="login_data.email"
        label="E-mail"
        type="email"
        required
        :rules="emailRules"
        @input="setLoginData($event, 'email')"
      ></v-text-field>
      <v-text-field
        v-model="login_data.password"
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
    </form>
  </div>
</template>

<script>
import authMixin from "@/mixins/auth";
export default {
  name: "AccountForm",
  mixins: [authMixin],
  data() {
    return {
      login_data: {
        email: "",
        password: "",
      },
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
    login() {
      this.LOGIN();
    },
  },
};
</script>
