<template>
  <form>
    <v-text-field
      v-model="email"
      label="Name"
      required
      :rules="emailRules"
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="E-mail"
      required
      :rules="passwordRules"
    ></v-text-field>
    <v-btn class="mr-4" @click="login"> {{ $t("Login") }} </v-btn>
  </form>
</template>

<script>
import authMixin from "@/mixins/auth";
export default {
  name: "AccountForm",
  mixins: [authMixin],
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>
