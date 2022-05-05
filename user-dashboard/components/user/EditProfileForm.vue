<template>
  <div class="mt-6">
    <v-tabs v-model="tab">
      <v-tabs-slider></v-tabs-slider>

      <v-tab v-for="(tab_item, index) in tab_items" :key="index">
        {{ tab_item.text }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item class="mt-4">
        <v-form v-model="form_valid">
          <v-row>
            <v-col cols="12">
              <div
                v-if="user_avatar_location"
                class="d-flex justify-center my-3"
              >
                <v-img
                  max-height="100px"
                  max-width="100px"
                  contain
                  :src="user_avatar_location"
                  alt="photo-upload"
                  class="avatar-border"
                ></v-img>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                :rules="firstNameRules"
                :label="$t('First name')"
                :value="user.first_name"
                required
                @input="
                  updateUserObject({
                    variable_path: 'first_name',
                    data: $event,
                  })
                "
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                :rules="lastNameRules"
                :label="$t('Last name')"
                :value="user.last_name"
                required
                @input="
                  updateUserObject({
                    variable_path: 'last_name',
                    data: $event,
                  })
                "
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                :rules="emailRules"
                :label="$t('Email')"
                :value="user.email"
                required
                type="email"
                :disabled="true"
                @input="
                  updateUserObject({
                    variable_path: 'email',
                    data: $event,
                  })
                "
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                :rules="phoneNumberRules"
                :label="$t('Phone number')"
                :value="user.phone_number"
                required
                type="tel"
                @input="
                  updateUserObject({
                    variable_path: 'phone_number',
                    data: $event,
                  })
                "
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-file-input
                v-model="file_of_avatar"
                small-chips
                truncate-length="15"
                :label="$t('Choose avatar')"
                @change="uploadAvatar"
                accept="image/*"
              ></v-file-input>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn
                depressed
                color="primary"
                @click="updateUser()"
                :disabled="!form_valid"
              >
                <span v-html="$t('Lưu')"></span>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-tab-item>

      <v-tab-item class="mt-4">
        <v-form v-model="security_form_valid">
          <v-row class="flex-column">
            <v-col cols="12">
              <v-text-field
                :value="security.old_password"
                :rules="oldPasswordRules"
                :append-icon="show_current_password ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show_current_password ? 'text' : 'password'"
                :label="$t('Current password')"
                @click:append="show_current_password = !show_current_password"
                @input="
                  updateSecurityObject({
                    variable_path: 'old_password',
                    data: $event,
                  })
                "
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                :append-icon="show_new_password ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show_new_password ? 'text' : 'password'"
                @click:append="show_new_password = !show_new_password"
                :rules="newPasswordRules"
                :label="$t('New password')"
                :value="security.new_password"
                required
                @input="
                  updateSecurityObject({
                    variable_path: 'password',
                    data: $event,
                  })
                "
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                :append-icon="
                  show_new_password_confirmation ? 'mdi-eye' : 'mdi-eye-off'
                "
                :type="show_new_password_confirmation ? 'text' : 'password'"
                @click:append="
                  show_new_password_confirmation =
                    !show_new_password_confirmation
                "
                :rules="newPasswordConfirmationRules"
                :label="$t('New password confirmation')"
                :value="password_confirmation"
                required
                @input="
                  updateSecurityObject({
                    variable_path: 'password_confirmation',
                    data: $event,
                  })
                "
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn
                depressed
                color="primary"
                @click="updateSecurity"
                :disabled="!security_form_valid"
              >
                <span v-html="$t('Lưu')"></span>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import userMixins from "@/mixins/user";
import authMixins from "@/mixins/auth";

export default {
  name: "EditProfileForm",
  mixins: [userMixins, authMixins],
  data() {
    return {
      form_valid: false,
      avatar_valid: false,
      tab: null,
      file_of_avatar: null,
      security_form_valid: false,
      show_new_password_confirmation: false,
      show_new_password: false,
      show_current_password: false,
      tab_items: [
        {
          text: "Thông tin chung",
          value: "common",
        },
        {
          text: "Bảo mật",
          value: "security",
        },
      ],
    };
  },
  computed: {
    user_avatar_location() {
      return _.get(this.user, "aws.meta.location", "");
    },
  },
  methods: {
    async updateSecurity() {
      const { is_error, message } = await this.UPDATE_USER_SECURITY({
        user_id: this.user._id,
        security_data: this.security,
      });

      if (is_error) {
        this.$toast.error(this.$t(message));
        return;
      }
      this.$toast.success(this.$t("Updated password successfully!"));
    },
    /**
     * @description input file
     */
    async uploadAvatar() {
      const max_size = 50 * 1024 * 1024; // 5MB
      const file = this.file_of_avatar;
      const file_size = _.get(file, "size", max_size + 1);

      if (file && file_size <= max_size) {
        this.$nextTick(async () => {
          const { data, is_error, message } = await this.UPDATE_USER_AVATAR({
            file: this.file_of_avatar,
            user_id: this.user._id,
          });

          if (is_error) {
            this.$toast.error(this.$t(message));
            return;
          }
          this.SET_USER({ data });
          this.$toast.success(this.$t("Updated successfully!"));
        });
      }
    },
    /**
     * @description input file
     */
    inputFile(event) {
      const max_size = 5 * 1024 * 1024; // 5MB
      const file = _.get(event, "target.files[0]");

      if (this.image_file) {
        this.$nextTick(() => {
          // reset image file
          this.image_file = "";
        });
      }

      if (file && file.size <= max_size) {
        this.$nextTick(async () => {
          this.image_file = file;

          // const event_image_location = URL.createObjectURL(file);
          this.avatar_valid = true;
          this.$forceUpdate();
          await this.UPDATE_USER_AVATAR({
            file: this.image_file,
            user_id: this.user._id,
          });
        });
      }
    },

    async updateUser() {
      await this.UPDATE_USER({ user: this.user });
    },
  },
};
</script>

<style scoped>
.wrapper-input-upload {
  outline: 2px dashed #286db4;
  background: #f3f6f8;
  height: 100px;
  width: 99%;
  position: relative;
  cursor: pointer;
  border-radius: 4px;
}

.input-upload {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
}

.wrapper-input-upload:hover {
  opacity: 0.8;
}
</style>
