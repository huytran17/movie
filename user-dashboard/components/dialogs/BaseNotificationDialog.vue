<template>
  <v-dialog :value="show_notification_dialog" persistent max-width="290">
    <v-card>
      <v-card-title>
        <v-icon color="primary" class="mr-2">mdi-alert-circle-outline</v-icon>
        <span class="text-body-2">
          <span class="app-title" v-html="$t('Thông báo')"></span>
        </span>
      </v-card-title>
      <v-card-text>
        <span v-html="$t(content)"></span>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="green darken-1" text @click="closeDialog">
          <span v-html="$t('Ok')"></span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "BaseNotificationDialog",
  props: {
    show_notification_dialog: {
      type: Boolean,
      default() {
        return false;
      },
    },
    content: {
      type: String,
      default() {
        return "";
      },
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close-notification-dialog");
    },
  },
};
</script>

<style></style>
