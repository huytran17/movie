<template>
  <v-container>
    <div class="text-body-1 text-sm-h6 text-uppercase primary--text mb-4">
      <span class="app-title">
        <span v-html="$t('Thêm Quản Trị Viên')"></span>
      </span>
    </div>
    <v-form v-model="form_valid">
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
        <v-col cols="12" md="6">
          <v-text-field
            :rules="phoneNumberRules"
            :label="$t('Phone number')"
            :value="sign_up_data.phone_number"
            required
            type="tel"
            @input="
              updateInput({ variable_path: 'phone_number', data: $event })
            "
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            :rules="addressRules"
            :label="$t('Address')"
            :value="sign_up_data.address"
            required
            type="address"
            @input="
              updateInput({
                variable_path: 'address',
                data: $event,
              })
            "
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-autocomplete
            :value="sign_up_data.type"
            :items="admin_types"
            :label="$t('Type')"
            item-text="text"
            item-value="value"
            :rules="typeRules"
            @input="updateInput({ variable_path: 'type', data: $event })"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-body-2">
            <label class="date-picker-label" v-html="$t('Birthday')"> </label>
          </div>
          <v-date-picker
            :value="sign_up_data.birthday"
            v-model="admin_birthday"
            color="green lighten-1"
            full-width
            :rules="birthdayRules"
            @input="
              updateInput({
                variable_path: 'birthday',
                data: $event,
              })
            "
          ></v-date-picker>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn
            depressed
            color="primary"
            @click="createAdmin()"
            :disabled="!form_valid"
          >
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
  name: "NewAdmin",
  mixins: [userMixins, authMixins, adminMixins],
  data() {
    return {
      admin_types: ["super", "normal"],
      form_valid: false,
      admin_birthday: new Date(Date.now()).toISOString().substr(0, 10),
    };
  },
  methods: {
    async createAdmin() {
      const { is_error, message } = await this.CREATE_ADMIN({
        admin_data: this.sign_up_data,
      });
      if (is_error) {
        this.$toast.error(this.$t(message));
        return;
      }
      this.$toast.success(this.$t("Created admin successfully!"));
      this.$router.push(this.localePath("/administrator"));
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
