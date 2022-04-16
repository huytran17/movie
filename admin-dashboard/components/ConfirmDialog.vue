<template>
  <v-dialog :value="show_confirm_dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="text-h5">
        <span v-html="$t('Cảnh báo')"></span>
      </v-card-title>
      <v-card-text>
        <span v-html="$t(content)"></span>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="closeDialog">
          <span v-html="$t('Hủy')"></span>
        </v-btn>
        <v-btn color="green darken-1" text @click="action">
          <span v-html="$t('Đồng ý')"></span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props: {
    show_confirm_dialog: {
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
    action: {
      type: Function,
      default() {
        return () => {};
      },
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
  },
};
</script>

<style></style>
