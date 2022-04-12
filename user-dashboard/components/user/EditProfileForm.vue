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
                v-if="get_user_avatar_location"
                class="d-flex justify-center my-3"
              >
                <v-img
                  max-height="100px"
                  max-width="100px"
                  contain
                  :src="get_user_avatar_location"
                  alt="photo-upload"
                  class="rounded-circle"
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
                @input="
                  updateUserObject({
                    variable_path: 'email',
                    data: $event,
                  })
                "
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <div
                class="wrapper-input-upload mx-auto px-2 d-flex align-center justify-center"
              >
                <input
                  type="file"
                  multiple
                  name="file"
                  @input="inputFile($event)"
                  accept="image/*"
                  class="input-upload"
                />
                <div class="d-flex justify-center align-center">
                  <v-spacer></v-spacer>
                  <div class="d-flex">
                    <v-icon class="mr-4" size="40">mdi-image-plus</v-icon>
                    <div>
                      <span class="font-weight-bold">
                        Drag or
                        <span class="text--primary">upload</span>
                        your photo here.
                      </span>
                      <br />
                      <span
                        >Upload file in JPG, JPEG, or PNG format and maximum
                        size 5MB</span
                      >
                    </div>
                  </div>
                  <v-spacer></v-spacer>
                </div>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn depressed color="primary" @click="updateUser()">
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
    get_user_avatar_location() {
      return _.get(this.user, "aws.meta.location", "") || undefined;
    },
  },
  methods: {
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
