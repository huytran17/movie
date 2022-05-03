<template>
  <v-dialog :value="show_dialog" persistent max-width="500">
    <v-card>
      <v-form v-model="form_valid">
        <v-col cols="12">
          <v-menu transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="Birthday"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                :value="formatDate(birthday, 'YYYY/MM/DD')"
                :rules="birthdayRules"
              ></v-text-field>
            </template>
            <v-date-picker
              :value="formatDate(birthday, 'YYYY/MM/DD')"
              v-model="birthday"
              color="green lighten-1"
              @input="
                updateUserObject({
                  variable_path: 'birthday',
                  data: $event,
                })
              "
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" class="d-flex justify-end">
          <v-btn
            depressed
            color="primary"
            @click="action"
            :disabled="!form_valid"
          >
            <span v-html="$t('Lưu')"></span>
          </v-btn>
        </v-col>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import systemMixins from "@/mixins/system";
import authMixins from "@/mixins/auth";

export default {
  name: "BaseUserCompleteProfile",
  mixins: [authMixins, systemMixins],
  props: {
    show_dialog: {
      type: Boolean,
      default() {
        return false;
      },
    },
    action: {
      type: Function,
      default() {
        return () => {};
      },
    },
  },
  data() {
    return {
      form_valid: false,
      birthday: new Date(Date.now()).toISOString().substr(0, 10),
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close-user-complete-profile-dialog");
    },
  },
  async mounted() {
    try {
      await this.GET_ME();

      this.updateUserObject({
        variable_path: "birthday",
        data: this.birthday,
      });
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style></style>
