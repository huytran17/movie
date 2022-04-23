<template>
  <div v-if="has_admin" class="mt-6">
    <v-tabs v-model="tab">
      <v-tabs-slider></v-tabs-slider>

      <v-tab v-for="(tab_item, index) in tab_items" :key="index">
        {{ tab_item.text }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item class="mt-4">
        <v-form v-model="info_form_valid">
          <v-row>
            <v-col cols="12">
              <div
                v-if="admin_avatar_location"
                class="d-flex justify-center my-3"
              >
                <v-img
                  max-height="100px"
                  max-width="100px"
                  contain
                  :src="admin_avatar_location"
                  alt="photo-upload"
                  class="rounded-circle"
                ></v-img>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                :rules="firstNameRules"
                :label="$t('First name')"
                :value="admin.first_name"
                required
                @input="
                  updateAdminObject({
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
                :value="admin.last_name"
                required
                @input="
                  updateAdminObject({
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
                :value="admin.email"
                required
                type="email"
                :disabled="true"
                @input="
                  updateAdminObject({
                    variable_path: 'email',
                    data: $event,
                  })
                "
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-menu transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="Birthday"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :value="formatDate(admin.birthday, 'YYYY/MM/DD')"
                  ></v-text-field>
                </template>
                <v-date-picker
                  :value="formatDate(admin.birthday, 'YYYY/MM/DD')"
                  v-model="admin_birthday"
                  color="green lighten-1"
                  @input="
                    updateAdminObject({
                      variable_path: 'birthday',
                      data: $event,
                    })
                  "
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                :rules="addressRules"
                :label="$t('Address')"
                :value="admin.address"
                required
                @input="
                  updateAdminObject({
                    variable_path: 'address',
                    data: $event,
                  })
                "
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                :rules="phoneNumberRules"
                :label="$t('Phone number')"
                :value="admin.phone_number"
                required
                @input="
                  updateAdminObject({
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
            <v-col cols="12" md="6">
              <v-autocomplete
                :value="admin.type"
                :items="admin_types"
                label="Type"
                item-text="text"
                item-value="value"
                :rules="typeRules"
                @input="
                  updateAdminObject({ variable_path: 'type', data: $event })
                "
              ></v-autocomplete>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn
                depressed
                color="primary"
                @click="updateUser()"
                :disabled="!info_form_valid"
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
                :value="security.new_password_confirmation"
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
import adminMixins from "@/mixins/admin";
import systemMixins from "@/mixins/system";

export default {
  name: "EditProfileForm",
  mixins: [adminMixins, systemMixins],
  data() {
    return {
      show_current_password: false,
      show_new_password_confirmation: false,
      show_new_password: false,
      admin_types: ["super", "normal"],
      info_form_valid: false,
      security_form_valid: false,
      avatar_valid: false,
      file_of_avatar: null,
      admin_birthday: new Date(Date.now()).toISOString().substr(0, 10),
      tab: null,
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
    admin_avatar_location() {
      return _.get(this.admin, "aws_avatar.meta.location", "");
    },

    has_admin() {
      return !!this.admin;
    },
  },
  methods: {
    /**
     * @description input file
     */
    async uploadAvatar() {
      const max_size = 50 * 1024 * 1024; // 5MB
      const file = this.file_of_avatar;
      const file_size = _.get(file, "size", max_size + 1);

      if (file && file_size <= max_size) {
        this.$nextTick(async () => {
          const { is_error, message } = await this.UPDATE_ADMIN_AVATAR({
            file: this.file_of_avatar,
            admin_id: this.admin._id,
          });

          if (is_error) {
            this.$toast.error(this.$t(message));
            return;
          }
          this.$toast.success(this.$t("Updated successfully!"));
        });
      }
    },

    async updateUser() {
      const { is_error, message } = await this.UPDATE_ADMIN({
        admin: this.admin,
      });
      if (is_error) {
        this.$toast.error(this.$t(message));
        return;
      }
      this.$toast.success(this.$t("Updated admin successfully!"));
    },

    async updateSecurity() {
      const { is_error, message } = await this.UPDATE_ADMIN_SECURITY({
        admin_id: this.admin._id,
        security_data: this.security,
      });

      if (is_error) {
        this.$toast.error(this.$t(message));
        return;
      }
      this.$toast.success(this.$t("Updated password successfully!"));
    },

    updateAdminObject({ variable_path, data }) {
      this.UPDATE_ADMIN_DATA({
        variable_path,
        data,
      });
    },
  },

  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      const admin_id = this.$route.params.id;
      await Promise.all([this.GET_ADMIN({ admin_id })]);
    } catch (e) {
      console.log(e);
    } finally {
      this.SET_LOADING({ data: false });
    }
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
