<template>
  <v-container>
    <div class="text-body-1 text-sm-h6 text-uppercase primary--text mb-4">
      <span class="app-title">
        <span v-html="$t('Thêm Người Dùng')"></span>
      </span>
    </div>
    <v-form>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            :rules="firstNameRules"
            :label="$t('First name')"
            :value="sign_up_data.first_name"
            required
            @input="updateInput({ variable_path: 'first_name', data: $event })"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            :rules="lastNameRules"
            :label="$t('Last name')"
            :value="sign_up_data.last_name"
            required
            @input="updateInput({ variable_path: 'last_name', data: $event })"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="12">
          <v-text-field
            :rules="emailRules"
            :label="$t('Email')"
            :value="sign_up_data.email"
            required
            type="email"
            @input="updateInput({ variable_path: 'email', data: $event })"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            :rules="passwordRules"
            :label="$t('Password')"
            :value="sign_up_data.password"
            required
            type="password"
            @input="updateInput({ variable_path: 'password', data: $event })"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            :rules="passwordConfirmationRules"
            :label="$t('Password Confirmation')"
            :value="sign_up_data.password_confirmation"
            required
            type="password"
            @input="
              updateInput({
                variable_path: 'password_confirmation',
                data: $event,
              })
            "
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn depressed color="primary" @click="createUser()">
            <span v-html="$t('Lưu')"></span>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import userMixins from "@/mixins/user";
import authMixins from "@/mixins/auth";
import adminMixins from "@/mixins/admin";

export default {
  name: "NewUser",
  mixins: [userMixins, authMixins, adminMixins],
  methods: {
    async createUser() {
      await this.CREATE_USER({ user_data: this.sign_up_data });
    },

    updateInput({ variable_path, data }) {
      this.SET_SIGN_UP_DATA({
        path: variable_path,
        data,
      });
    },
  },
};
</script>

<style></style>
